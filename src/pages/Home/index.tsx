

import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";


import * as zod from 'zod';
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidator = zod.object({
  task: zod.string().min(1, "informe a tarefa"),
  minutesAmaunt: zod.number().min(5, '').max(60)
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidator>



export function Home() {

  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidator),
    defaultValues: {
      task: '',
      minutesAmaunt: 0
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}