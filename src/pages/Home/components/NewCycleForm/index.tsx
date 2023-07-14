import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { FormContainerContainer, MinutesAmountInput, TaskInput } from "./style";
import { CyclesContext } from "../../../../context/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainerContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestion"
        placeholder="Dê um nome para o seu projeto"
        {...register("task")}
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestion">
        <option>Projeto 1</option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        {...register("minutesAmount", {
          valueAsNumber: true,
        })}
        disabled={!!activeCycle}
      />

      <span>minutos.</span>
    </FormContainerContainer>
  );
}
