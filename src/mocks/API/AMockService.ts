export interface IResponse<T> {
  status: number;
  body?: T;
}

export abstract class AMockService {
  private varPrefix = 'DB_'

  protected getVariable<T>( variable: string ): T | null {
    const content = localStorage.getItem( this.varPrefix + variable )
    if ( content ) {
      return JSON.parse( content )
    }

    return null
  }

  protected setVariable( variable: string, value: any ): void {
    localStorage.setItem( this.varPrefix + variable, JSON.stringify( value ) )
  }

  protected generateId( variable: string ): number | null {
    try {
      const data = localStorage.getItem( this.varPrefix + variable )
      if ( data !== null ) {
        const parsedData = JSON.parse( data )

        if ( !Array.isArray( parsedData ) ) {
          throw new Error( 'Not Array' )
        }

        return parsedData.length
      }

      return 0
    } catch ( err ) {
      // eslint-disable-next-line no-console
      console.log( ( err as Error ).message )
      return null
    }
  }

  protected returnResponse<T>( status: 200 | 201 | 204 | 400 | 500, content?: T ): Promise<IResponse<T>> {
    const response: IResponse<T> =  {
      status,
    }

    if ( content ) {
      response.body = content
    }

    if ( import.meta.env.instantAPIMode ) {
      return new Promise( ( resolve ) => {
        resolve( response )
      } )
    } else {
      return new Promise( ( resolve ) => {
        setTimeout( () => {
          resolve( response )
        }, 120 + Math.random() * 880 )
      } )
    }
  }

} 

