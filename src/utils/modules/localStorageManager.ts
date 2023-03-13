import { ref, readonly, computed } from 'vue'

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

export const localStorageManager = new class LocalStorageManager {
  private sizeTree: SizeTree = new SizeTree
  private _storageLimit = ref<null | number>( null )

  get storageLimit() {
    return readonly( this._storageLimit ) 
  }

  get usedSpace() {
    return this.sizeTree.usedSpace
  }

  get varSizes() {
    return readonly( this.sizeTree.varSizes )
  }
  
  async init(): Promise<void> {
    await this.defineStorageLimit()
    this.sizeTree.init()
  }

  public setStorageLimit( limit: number ): boolean {
    try {
      localStorage.setItem( DEFINE_SIZE, '1'.repeat( limit ) )
      this._storageLimit.value = limit
      localStorage.removeItem( DEFINE_SIZE )
      return true
    } catch ( err ) {
      return false
    }
  }

  private async defineStorageLimit(): Promise<void> {
    const limit = localStorage.getItem( STORAGE_LIMIT_VALUE )

    if ( limit === null ) {
      this._storageLimit.value = await this.searchStorageLimit()
      localStorage.setItem( STORAGE_LIMIT_VALUE, this._storageLimit.value.toString() )
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

