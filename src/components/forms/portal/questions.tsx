import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'

type Props = {
    questions: {
        id:string
        question:string
        answered: string | null
    }[]
    register: UseFormRegister<FieldValues>
    error: FieldErrors<FieldValues>
    onNext():void
}

export default function QuestionsForm({
    questions,
    register,
    error,
    onNext
}: Props) {
  return (
    <div className='flex flex-col gap-5 justify-center'>
        <div className='flex justify-center'>
            <h2 className='text-4xl font-bold mb-5'>Account Details</h2>
        </div>
        {
            questions
            ?.filter((questions) => questions.answered)
            .map((questions) => (
                <FormGenerator 
                    defaultValue={questions.answered || ''}
                    key={questions.id}
                    name={`question-${questions.id}`}
                    errors={error}
                    register={register}
                    label={questions.question}
                    type='text'
                    inputType='input'
                    placeholder={questions.answered || 'Cevap verilmedi'}
                />
            ))
        }

        <Button 
         className='mt-5'
         type='button'
         onClick={onNext}
        >İleri</Button>
    </div>
  )
}