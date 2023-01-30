import { ActionTypes } from "./action"
import { produce } from 'immer'

export interface Cycle {
  id: string,
  task: string,
  minutesAmaunt: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date
}


interface CyclesState {
  cycles: Cycle[],
  activeCyclesId: string | null
}




export function cyclesReducer(state: CyclesState, action: any) {

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCyclesId: action.payload.newCycle.id
      // }
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCyclesId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map(ciclo => {
      //     if (ciclo.id === state.activeCyclesId) {
      //       return { ...ciclo, interruptDate: new Date() }
      //     } else {
      //       return ciclo
      //     }
      //   }),
      //   activeCyclesId: null
      // }

      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCyclesId
      })
      if (currentCycleIndex < 0) return state

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].interruptDate = new Date()
        draft.activeCyclesId = null
      })


    }
    case ActionTypes.FINISH_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map(ciclo => {
      //     if (ciclo.id === state.activeCyclesId) {
      //       return { ...ciclo, finishedDate: new Date() }
      //     } else {
      //       return ciclo
      //     }
      //   })
      // }

      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCyclesId
      })
      if (currentCycleIndex < 0) return state

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCyclesId = null
      })
    }
    default:
      return state
  }
}