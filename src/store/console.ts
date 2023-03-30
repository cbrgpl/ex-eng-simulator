import { defineStore } from 'pinia'

export interface IConsoleLog {
  id: number;
  timestamp: string;
  autogenerated?: boolean;
  title: string;
  text: string | null;
  variant: 'message' | 'warning' | 'error' | 'success';
}
export type IConsoleLogIn = Omit<IConsoleLog, 'id' | 'timestamp'>

export type URenderableProps = Extract<keyof IConsoleLog, 'title' | 'text'>

export type RenderableProps = {
  URequired: Extract<keyof IConsoleLog, 'title'>;
  UPartial: Extract<keyof IConsoleLog, 'text' | 'subtitle'>;
}

class ConsoleThread {
  buffer = [] as IConsoleLog[]

  public get id(): number {
    return this.buffer[ 0 ] ? this.buffer[ 0 ].id + 1 : 0
  }
}

const state: Record<UThreads, InstanceType<typeof ConsoleThread>> = {
  storageThread: new ConsoleThread(),
}

export type UThreads = 'storageThread'

export const useConsoleStore = defineStore( 'console', {
  state: () => {
    return state
  },
  actions: {
    clearThread( thread: UThreads ) {
      this[ thread ].buffer = []
    },
    log( thread: UThreads, log: IConsoleLogIn ) {
      const id = this[ thread ].id

      this[ thread ].buffer.unshift( {
        id,
        timestamp: ( new Date() ).toISOString(),
        ...log,
      } )

    },
    replace( thread: UThreads, newLog: IConsoleLog ) {
      const index = this[ thread ].buffer.findIndex( ( log ) => log.id === newLog.id )
      this[ thread ].buffer[ index ] = newLog
    },
  },
} )

export type IConsoleStore = ReturnType<typeof useConsoleStore>


