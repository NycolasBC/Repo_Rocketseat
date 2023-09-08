import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from "react-hook-form";

import {
    CloseButton,
    Content,
    Overlay,
    TransactionType,
    TransactionTypeButton
} from "./styles";

import { TransactionsContext } from "../../Contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";


const newTransactionFormSchema = z.object({
    DESCRIPTION: z.string(),
    PRICE: z.number(),
    CATEGORY: z.string(),
    TYPE: z.enum(['income', 'outcome']),
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
    const createTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.createTransaction
    })

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm<NewTransactionsFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
    })

    async function handleCreateNewTransaction(data: NewTransactionsFormInputs) {
        const { DESCRIPTION, CATEGORY, PRICE, TYPE } = data

        createTransaction({
            DESCRIPTION,
            CATEGORY,
            PRICE,
            TYPE
        })

        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        required {...register('DESCRIPTION')}
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        required {...register('PRICE', { valueAsNumber: true })}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required {...register('CATEGORY')}
                    />

                    <Controller
                        control={control}
                        name='TYPE'
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    )
}