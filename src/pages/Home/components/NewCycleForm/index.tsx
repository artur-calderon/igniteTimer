import { FormContainer, MinutesAmountInput, TaksInput } from "./styles"

import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";




export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaksInput
        id='task'
        placeholder="Dê um nome para o seu projeto"
        type="text"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register('task')}
      />


      <datalist id="task-suggestions">
        <option value="Projeto doido"></option>
        <option value="Projeto doidao meu"></option>
        <option value="Jogo da véia"></option>

      </datalist>


      <label htmlFor="">Durante</label>
      <MinutesAmountInput
        type="number"
        placeholder="00"
        id='minutesAmount'
        disabled={!!activeCycle}
        step={5}
        min={5}
        max={60}
        {...register('minutesAmaunt', { valueAsNumber: true })}
      />


      <span>minutos.</span>
    </FormContainer>
  )
}