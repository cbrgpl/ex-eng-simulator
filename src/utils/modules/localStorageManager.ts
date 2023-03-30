import { ref, readonly, computed } from 'vue'
import { t } from '@/utils/plugins/i18n'

import { 
  EventEmitter,
  type IEventEmitterOwner,
  StoreConnector,
  type IStoreConnectorRestriction,
} from '@modules/EventEmitter'

const DEFINE_SIZE = 'define_storage_length'
const STORAGE_LIMIT_VALUE = 'storage_limit'

type ISizes = Record<string, number> // bytes
const BYTES_PER_SYMBOL = 1

class SizeTree {
  public usedSpace = computed( (): number => {
    let total = 0
    for ( const prop in this.varSizes.value ) {
      total += this.varSizes.value[ prop ] 
    }
    return total
  } )

  public varSizes = ref<ISizes>( {} )

  public init() {
    this.fillTree()
    this.startListenStorage()
  }

  private startListenStorage(): void {
    const originalMethods = {
      setItem: localStorage.setItem.bind( localStorage ),
      removeItem: localStorage.removeItem.bind( localStorage ),
    }
    
    window.addEventListener( 'storage', this.sync.bind( this ) )

    localStorage.setItem = ( key, newValue ) => {
      const oldValue = localStorage[ key ]
      originalMethods.setItem( key, newValue )
      window.dispatchEvent( new StorageEvent( 'storage', { key, newValue, oldValue } )  )
    }

    localStorage.removeItem = ( key ) => {
      originalMethods.removeItem( key )
      window.dispatchEvent( new StorageEvent( 'storage', { key } )  )
    }
  }

  private sync( event: StorageEvent ): void {
    const key = event.key
    const newValue = event.newValue

    if ( !key ) {
      console.warn( 'Size Tree syncing was prevent due to no key value;' )
      return
    }
  
    const removeItem = !newValue 
    if ( removeItem ) {
      delete this.varSizes.value[ key ]
    } else {
      this.varSizes.value[ key ] = ( key.length + newValue.length ) * BYTES_PER_SYMBOL
    }
  }

  private fillTree(): void {
    let key: keyof typeof localStorage
    for ( key in localStorage ) {
      if ( !Object.hasOwn( localStorage, key ) ) {
        continue
      }

      const propSize = ( ( key.length + localStorage[ key ].length ) * BYTES_PER_SYMBOL )
      this.varSizes.value[ key ] = propSize
    }
  }
}

interface IStorageManagerEvents {
  'limitChange': { oldLimit: number | null; newLimit: number };
  'limitChangeReject': { newLimit: number };
}

const bytesToKb = ( bytes: number | null ) => bytes ? ( bytes / 1024 ).toFixed( 2 ) + 'Kb' : null
const connectorEventRenderFns: IStoreConnectorRestriction<IStorageManagerEvents>  = {
  'limitChange': {
    title: () => t( 'Profile.LimitChangeTitle' ),
    text: ( args ) => t( 'Profile.LimitChangeText', { oldLimit: bytesToKb( args.oldLimit ), newLimit: bytesToKb( args.newLimit ) } ),
    setEventBasedProps: ( logPartial ) => {
      return {
        ...logPartial,
        variant: 'message',
      }
    },
  },
  'limitChangeReject': {
    title: () => t( 'Profile.LimitChangeRejectTitle' ),
    text: ( args ) => t( 'Profile.LimitChangeRejectText', { newLimit: bytesToKb( args.newLimit ) } ),
    setEventBasedProps: ( logPartial ) => {
      return {
        ...logPartial,
        variant: 'error',
      }
    },
  },
}

export const localStorageManager = new class LocalStorageManager implements IEventEmitterOwner<IStorageManagerEvents, InstanceType<typeof EventEmitter<IStorageManagerEvents>>> {
  private sizeTree: SizeTree = new SizeTree
  private _storageLimit = ref<null | number>( null )
  
  private eventEmitter = new EventEmitter<IStorageManagerEvents>()
  private storeEmitterConnector: StoreConnector<IStorageManagerEvents, IStoreConnectorRestriction<IStorageManagerEvents>, 'storageThread'>
  
  private _definingLimit = ref( true )

  get storageLimit() {
    return readonly( this._storageLimit ) 
  }

  get usedSpace() {
    return this.sizeTree.usedSpace
  }

  get varSizes() {
    return readonly( this.sizeTree.varSizes )
  }

  get definingLimit() {
    return readonly( this._definingLimit )
  }
   
  async init(): Promise<void> {
    await this.defineStorageLimit()
    this.storeEmitterConnector = new StoreConnector<IStorageManagerEvents, typeof connectorEventRenderFns, 'storageThread'>( 'storageThread', connectorEventRenderFns, this.eventEmitter  )
    this.sizeTree.init()
  }

  // Event Emitter Proxies
  on<Args extends Parameters<EventEmitter<IStorageManagerEvents>['on']>>( event: Args[0], handler: Args[1] ): ReturnType<EventEmitter<IStorageManagerEvents>['on']> {
    return this.eventEmitter.on( event, handler )
  }

  off<Args extends Parameters<EventEmitter<IStorageManagerEvents>['on']>>( event: Args[0], handler: Args[1] ): ReturnType<EventEmitter<IStorageManagerEvents>['off']> {
    return this.eventEmitter.off( event, handler )
  }

  // Core Logic
  public setStorageLimit( limit: number ): void | true {
    try {
      localStorage.setItem( DEFINE_SIZE, '1'.repeat( limit ) )
      
      const oldLimit = this._storageLimit.value
      this._storageLimit.value = limit
      
      this.eventEmitter.notify( 'limitChange', { oldLimit, newLimit: limit } )
      
      return true
    } catch ( err ) {
      this.eventEmitter.notify( 'limitChangeReject', { newLimit: limit } )
    }
    finally {
      localStorage.removeItem( DEFINE_SIZE )
    }
  }

  private async defineStorageLimit(): Promise<void> {
    const limit = localStorage.getItem( STORAGE_LIMIT_VALUE )

    if ( limit === null ) {
      this._definingLimit.value = true

      this._storageLimit.value = await this.searchStorageLimit()
      localStorage.setItem( STORAGE_LIMIT_VALUE, this._storageLimit.value.toString() )

      this._definingLimit.value = false
      return
    }

    this._storageLimit.value = +limit
  }

  private async searchStorageLimit(): Promise<number> {
    const minBytes = 128 * 1024 // KB * 1024
    const maxBytes = 30000 * 1024 // KB * 1024
    const precision = 20 * 1024 // KB * 1024
    const bytesPerSymbol = 1

    const getSymbolsSequence = ( byteSize: number ) => {
      const symbolsQnt = byteSize % bytesPerSymbol === 0 ? byteSize / bytesPerSymbol : Math.floor( byteSize / bytesPerSymbol ) + 1
      return '1'.repeat( symbolsQnt )
    }
    
    const writeToStorage = ( content: string ): Promise<void> => new Promise( ( resolve ) => {
      localStorage.setItem( DEFINE_SIZE, content )
      setTimeout( () => resolve(), 16 )
    } ) 
    
    const findStorageLimit = async ( min: number, max: number ): Promise<number | undefined> => {
      let leftBoundary: number
      let rightBoundary = min

      const base = 2
      let power = 0
      let step: number

      try {
        do {
          step = Math.pow( base, power++ )
        
          leftBoundary = rightBoundary
          rightBoundary = leftBoundary + step
          
          const symbols = getSymbolsSequence( rightBoundary )
          try { 
            await writeToStorage( symbols )
          } catch {
            if ( rightBoundary - leftBoundary <= precision ) {
              return leftBoundary
            }
              
            return findStorageLimit( leftBoundary, rightBoundary ) 
          }
          
          const storageLimitOutOfMax = rightBoundary >= max
          if ( storageLimitOutOfMax ) {
            return max
          }
        // eslint-disable-next-line no-constant-condition
        } while ( true )
      } finally {
        localStorage.removeItem( DEFINE_SIZE )
      }
    }
    return findStorageLimit( minBytes, maxBytes ) as Promise<number>
  }
}

