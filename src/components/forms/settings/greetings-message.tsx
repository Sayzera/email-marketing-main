'use client';

import Section from '@/components/section';
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import FormGenerator from '../form-generator';

type Props = {
    message: string;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
}

export default function GreetingsMessage({
    message,
    register,
    errors
}: Props) {
  return (
    <div className='flex flex-col gap-2'>
        <Section 
            label='Karşılama Mesajı'
            message='Ziyaretçilere gösterilecek karşılama mesajınızı buradan düzenleyebilirsiniz.'
        />
        <div className='lg:w-[500px]'>
            <FormGenerator 
            label='Karşılama Mesajı'
                placeholder={message}
                inputType='textarea'
                lines={2}
                register={register}
                errors={errors}
                name='welcomeMessage'
                type='text'
        />
        </div>
    </div>
  )
}