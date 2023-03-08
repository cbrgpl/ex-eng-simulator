import { IPreProfile, IProfile, profileService } from '@api'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore( 'user', {
  state: () => {
    return {
      profiles: [] as IProfile[],
      profilesAreLoading: false,
      activeProfile: null as IProfile | null,
    }
  },
  actions: {
    async create( profile: IPreProfile ): Promise<IProfile | void> {
      const response = await profileService.create( profile )

      if ( response.status === 201 ) {
        const createdProfile = response.body as IProfile
        this.profiles.unshift( createdProfile )
        return createdProfile
      } else if ( response.status === 400 ) {
        // TODO TOAST
      } else {
        // TODO 500
      }
    },
    async get(): Promise<void> {
      try {
        this.profilesAreLoading = true
        const response = await profileService.get()
  
        if ( response.status === 200 ) {
          this.profiles = ( response.body as IProfile[] ).sort( ( p1: IProfile, p2: IProfile ) => p2.id - p1.id )
        } else if ( response.status === 500 ){
          // TODO 500
        } else {
          // TODO UNEXCEPTED
        }
      } finally {
        this.profilesAreLoading = false
      }
    },
    async delete( id: number ): Promise<void> {
      const response = await profileService.delete( id )

      if ( response.status === 204 ) {
        const removeIndex = this.profiles.findIndex( profile => profile.id === id )
        this.profiles.splice( removeIndex, 1 )
        
        if ( this.activeProfile?.id === id ) {
          this.activeProfile = null
        }
      
      } else if ( response.status === 500 ){
        // TODO 500
      } {
        // TODO UNEXCEPTED
      }

    },
  },
} )
