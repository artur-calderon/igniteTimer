import { differenceInSeconds } from "date-fns"
import { createContext, ReactNode, useEffect, useReducer, useState } from "react"
import { ActionTypes, addnewCycleAction, finishCurrentCycleAction, interruptCurrentCycleAction } from "../reducers/cycles/action"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"

interface CreateCycleData {
  task: string,
  minutesAmaunt: number,
}



interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined,
  activeCyclesId: string | null,
  finishedCurrentCycle: () => void,
  amauntSecondsPassed: number,
  setSecondsPassed: (seconds: number) => void,
  createNewCycle: (data: CreateCycleData) => void,
  interruptCurrentCycle: () => void
}




export const CyclesContext = createContext({} as CycleContextType)


interface CycleContextProviderProps {
  children: ReactNode
}




export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCyclesId: null
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@igniteTimer:cycle-state-1.0', stateJSON)

  }, [cyclesState])

  const { cycles, activeCyclesId } = cyclesState;

  const activeCycle = cycles.find(cycle => cycle.id === activeCyclesId);

  const [amauntSecondsPassed, setamauntSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  function finishedCurrentCycle() {
    dispatch(finishCurrentCycleAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmaunt: data.minutesAmaunt,
      startDate: new Date()

    }
    // setCycles(state => [...state, newCycle]);
    dispatch(addnewCycleAction(newCycle))

    setSecondsPassed(0)
  }



  function setSecondsPassed(seconds: number) {
    setamauntSecondsPassed(seconds)
  }


  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider value={{ activeCycle, activeCyclesId, finishedCurrentCycle, amauntSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle, cycles }}>
      {children}
    </CyclesContext.Provider>
  )
}