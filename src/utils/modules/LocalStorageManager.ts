export const localStorageManager = new class LocalStorageManager {
  async searchStorageLimit(): Promise<number> {
    const minBytes = 128 * 1024 // KB * 1024
    const maxBytes = 30000 * 1024 // KB * 1024
    const precision = 20 * 1024 // KB * 1024
    const bytesPerSymbol = 1

    const getSymbolsSequence = ( byteSize: number ) => {
      const symbolsQnt = byteSize % bytesPerSymbol === 0 ? byteSize / bytesPerSymbol : Math.floor( byteSize / bytesPerSymbol ) + 1
      return '1'.repeat( symbolsQnt )
    }
    
    // const writeToStorage = async ( content: string ) => 
    
    const findStorageLimit = async ( min: number, max: number ): Promise<number | undefined> => {
      let leftBoundary: number
      let rightBoundary = min
      // debugger
      const base = 2
      let power = 0
      let step: number

      do {
        step = Math.pow( base, power++ )
      
        leftBoundary = rightBoundary
        rightBoundary = leftBoundary + step
        
        const symbols = getSymbolsSequence( rightBoundary )
        try { 
          await new Promise<void>( ( resolve ) => { localStorage.setItem( 'define_storage_length', symbols ); resolve() } )
        } catch {
          if ( rightBoundary - leftBoundary <= precision ) {
            return leftBoundary
          }
            
          return findStorageLimit( leftBoundary, rightBoundary ) 
        }
        
        if ( rightBoundary >= max ) {
          // Это будет значить, что точка поиска находится вне указанного отрезка. Тогда будет уместно вернуть max
          // Т.к. это будет наибольшее валидное значение
          return max
        }
      // eslint-disable-next-line no-constant-condition
      } while ( power <= 100 )
    }

    return findStorageLimit( minBytes, maxBytes ) as Promise<number>
  }
}

