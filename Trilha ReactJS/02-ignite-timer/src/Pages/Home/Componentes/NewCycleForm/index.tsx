import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../Contexts/CyclesContext";
import { useFormContext } from "react-hook-form";


export function NewCycleForm() {

    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()


    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para seu projeto"
                list="task-suggestion"
                disabled={!!activeCycle}
                {...register('task')}
            />

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount"
                placeholder="00"
                step={4}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <datalist id="task-suggestion">
                <option value="Café da manhã"></option>
                <option value="Descanso"></option>
                <option value="Estudo"></option>
                <option value="Trabalho"></option>
            </datalist>

            <span>minutos.</span>
        </FormContainer>
    )
}