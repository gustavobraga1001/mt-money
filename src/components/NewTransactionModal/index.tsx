import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export const NewTransactionModal = () => {
  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction
  });

  const { 
      register, 
      handleSubmit,
      formState: {
        isSubmitting
      },
      reset
    } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income'
    }
  })

  async function handleCreateNewTransaction (data: newTransactionFormInputs) {
    const { description, price, type, category  } = data

    await createTransaction({
      description,
      price,
      category,
      type,
    });

    reset()
  }

  return (
    <Dialog.Portal>
        <Overlay />

        <Content>
            <Dialog.Title>Nova Transação</Dialog.Title>

            <CloseButton>
                <X size={24}/>
            </CloseButton>

            <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                <input 
                  type="text" 
                  placeholder='Descrição' 
                  required
                  {...register('description')}
                />
                <input 
                  type="number" 
                  placeholder='Preço' 
                  required
                  {...register('price', { valueAsNumber: true })}
                />
                <input 
                  type="text" 
                  placeholder='Categoria' 
                  required
                  {...register('category')}
                />

                <TransactionType>
                  <TransactionTypeButton variant='income' value='income'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saida
                  </TransactionTypeButton>
                </TransactionType>

                <button type='submit' disabled={isSubmitting} >Cadastrar</button>
            </form>

        </Content>
    </Dialog.Portal>
  )
}
