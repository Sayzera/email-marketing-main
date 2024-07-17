'use client'

import { Button } from '@/components/ui/button';
import { useAuthContextHook } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up';
import Link from 'next/link';
import React from 'react'
import { useFormContext } from 'react-hook-form';

type Props = {}

function ButtonHandler({ }: Props) {
  const { setCurrentStep, currentStep } = useAuthContextHook();
  const { formState, getFieldState, getValues } = useFormContext()
  const { onGenerateOTP } = useSignUpForm()

  const { isDirty: isName } = getFieldState('fullname', formState)
  const { isDirty: isEmail } = getFieldState('email', formState)
  const { isDirty: isPassword } = getFieldState('password', formState)

  if (currentStep === 3) {
    return (
      <div className='w-full flex flex-col gap-3 items-center'>
        <Button type='submit'
          className='w-full'
        >
          Hesap oluştur
        </Button>
        <p>
          Hesabın var mı?{' '}
          <Link href="/auth/sign-in" className='font-bold'>Giriş Yap</Link>
        </p>

      </div>
    )
  }

  if (currentStep === 2) {
    return (
      <div className='w-full flex flex-col gap-3 items-center'>
        <Button
          type='submit'
          className='w-full'
          {
          ...(isName &&
            isEmail &&
            isPassword && {
            onClick: () => {
              onGenerateOTP(
                getValues('email'),
                getValues('password'),
                setCurrentStep
              )
            }
          }
          )
          }
        >
          Devam Et
        </Button>
        <p>
        Hesabın var mı?{' '}
        <Link href="/auth/sign-in" className='font-bold'>Giriş Yap </Link>
      </p>
      </div>
    )
  }
  return (
    <div className='w-full flex flex-col gap-3 items-center'>
      <Button type='submit'
        className='w-full'
        onClick={() => setCurrentStep((prev: number) => prev + 1)}
      >
        Devam Et
      </Button>
      <p>
        Hesabın var mı?{' '}
        <Link href="/auth/sign-in" className='font-bold'>Giriş Yap </Link>
      </p>

    </div>
  )
}

export default ButtonHandler