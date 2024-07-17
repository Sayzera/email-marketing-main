'use client'

import Section from '@/components/section'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { useHelpDesk } from '@/hooks/settings/use-settings'
import React from 'react'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import Loader from '@/components/loader'
import Accordion from '@/components/accordion'

type Props = {
  id: string
}

export default function HelpDesk({
  id
}: Props) {
  const {
    register,
    errors,
    onSubmitQuestion,
    isQuestions,
    loading
  } = useHelpDesk(id)
  return (
    <Card
      className='w-full grid grid-cols-1 md:grid-cols-2'
    >
      <CardContent className='p-6 border-r-[1px]'>
        <CardTitle>Yardım</CardTitle>
        <form onSubmit={onSubmitQuestion} className='flex flex-col gap-6 mt-10'>
          <div className='flex flex-col gap-3'>
            <Section
              label='Sorular'
              message='Sık sorulduğunu düşündüğünüz bir soru ekleyin'
            />
            <FormGenerator
              label='Soru tipi'
              inputType='input'
              register={register}
              errors={errors}
              form='help-desk-form'
              name='question'
              placeholder='Soru tipi'
              type='text'
              disabled={loading}
            />
          </div>


          <div className='flex flex-col gap-3'>
            <Section 
              label='Sorunuzun cevabı'
              message='Sorunuzun cevabı hakkında'
            />


            <FormGenerator 
            
              label='Sorunuzun cevabı'
              inputType="textarea"
              register={register}
              errors={errors}
              name='answer'
              form='help-desk-form'
              placeholder='Sorunuzun cevabı'
              type='text'
              lines={5}
              disabled={loading}
            />
          </div>

          <Button 
          disabled={loading}
            type='submit'
            className='bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold'
            >Kaydet</Button>
        </form>
      </CardContent>
      <CardFooter 
       className=' flex flex-col p-6 overflow-y-auto chat-window justify-start items-start w-full'
      >
        <Loader loading={loading}>
          {
            isQuestions?.length ? (
              isQuestions.map((question) => (
                <Accordion 
                  key={question.id}
                  trigger={question.question}
                  content={question.answer}
                  />
              ))
            ): (
              <CardDescription>Soru Bulunamadı</CardDescription>
            )
          }
        </Loader>

      </CardFooter>
    </Card>
  )
}