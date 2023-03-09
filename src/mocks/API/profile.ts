import { AMockService, type IResponse } from './AMockService'

const variables = {
  PROFILES: 'profiles',
}

export interface IProfile {  
  id: number;
  name: string;
  creation: string;
  activityTime: number;
}

export type IPreProfile = Pick<IProfile, 'name'> 

class ProfileService extends AMockService {
  create( profile: IPreProfile ): Promise<IResponse<IProfile | string>> {
    const id = super.generateId( variables.PROFILES )

    if ( id === null ) {
      return super.returnResponse( 500, 'Error while generating id' )
    }

    const newProfile: IProfile = {
      id,
      creation: new Date().toISOString(),
      activityTime: 0, 
      ...profile,
    }

    const profiles = super.getVariable( variables.PROFILES ) 
   
    if ( profiles === null ) {
      super.setVariable( variables.PROFILES, [ newProfile ] )    
    } else {
      ( profiles as unknown as Array<IProfile> ).push( newProfile )
      super.setVariable( variables.PROFILES, profiles )
    }

    return super.returnResponse<IProfile>( 201, newProfile ) 
  }

  get(): Promise<IResponse<IProfile[]>> {
    const profiles = super.getVariable<IProfile[]>( variables.PROFILES ) ?? []
    return super.returnResponse<IProfile[]>( 200, profiles )
  }

  delete( id: number ): Promise<IResponse<undefined>> {
    const profiles = super.getVariable<IProfile[]>( variables.PROFILES ) ?? []

    const removeIndex = profiles.findIndex( profile => profile.id === id )
    profiles.splice( removeIndex, 1 )

    super.setVariable( variables.PROFILES, profiles )

    return super.returnResponse( 204 )
  }
}

export const profileService = new ProfileService()
