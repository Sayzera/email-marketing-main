'use client';

import { AuthContextProvider } from '@/context/use-auth-context';
import { useSignInForm } from '@/hooks/sign-in/use-sign-in';
import React from 'react'
import { FormProvider } from 'react-hook-form';

type Props = {
    children: React.ReactNode
}

export default function SignInFormProvider({
    children
}: Props) {
   const { methods, onHandleSubmit, loading} = useSignInForm()
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className='h-full'>
          {children}
        </form>
      </FormProvider>
    </AuthContextProvider>
  )
}