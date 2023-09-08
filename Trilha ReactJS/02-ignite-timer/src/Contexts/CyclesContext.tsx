import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { version } from '../../package.json'
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../Reducers/Cycles/actions";
import { Cycle, CyclesReducer } from "../Reducers/Cycles/reducer";


interface CreateNewCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextData {
    cycles: Cycle[]
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    createNewCycle: (data: CreateNewCycleData) => void;
    interruptCurrentCycle: () => void;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextData)

interface CyclesContextProviderProps {
    children: ReactNode;
}


export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(CyclesReducer,
        {
            cycles: [],
            activeCycleId: null,
        },
        (initialValues) => {
            const storageStateAsJSON = localStorage.getItem(`#ignite-timer:cycles-state-${version}`)

            if (storageStateAsJSON) {
                return JSON.parse(storageStateAsJSON)
            }

            return initialValues
        }
    );

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem(`#ignite-timer:cycles-state-${version}`, stateJSON)
    }, [cyclesState])


    function createNewCycle(data: CreateNewCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))

        // setCycles((state) => [...state, newCycle])
        setAmountSecondsPassed(0)
    };

    function interruptCurrentCycle() {

        dispatch(interruptCurrentCycleAction())
    };

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    };

    function markCurrentCycleAsFinished() {

        dispatch(markCurrentCycleAsFinishedAction())
    };

    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
        }}>
            {children}
        </CyclesContext.Provider>
    )
}