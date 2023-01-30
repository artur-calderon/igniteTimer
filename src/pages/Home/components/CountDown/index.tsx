import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";

import { CountdownContainer, Separator } from "./styles";

export function CountDown() {

  const { activeCycle, activeCyclesId, finishedCurrentCycle, amauntSecondsPassed, setSecondsPassed } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmaunt * 60 : 0


  const currentSeconds = activeCycle ? totalSeconds - amauntSecondsPassed : 0;

  const minutesAmaunt = Math.floor(currentSeconds / 60)
  const secondsAmaunt = currentSeconds % 60;

  const minutes = String(minutesAmaunt).padStart(2, '0')
  const seconds = String(secondsAmaunt).padStart(2, '0')


  useEffect(() => {
    if (activeCycle)
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {

      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        if (secondsDifference >= totalSeconds) {
          finishedCurrentCycle()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }

      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCyclesId, finishedCurrentCycle])
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}