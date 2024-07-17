'use client'

import { USER_REGISTRATION_FORM } from '@/constants/forms'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'

type Props = {
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,


}

function AccountDetailForm({
    register,
    errors
}: Props) {
    return (
        <>
            <h2 className='text-gravel md:text-4xl font-bold'>Hesap Detayları</h2>
            <p className='text-iridium md:text-sm'>Lütfen e-Posta adresinizi ve şifrenizi giriniz.</p>
            {
                USER_REGISTRATION_FORM.map((field) => (
                    <FormGenerator
                        key={field.id}
                        {...field}
                        errors={errors}
                        register={register}
                        label={field.name}
                        name={field.name}


                    />
                ))
            }
        </>
    )
}

export default AccountDetailForm