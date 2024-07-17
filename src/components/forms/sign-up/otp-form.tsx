import OTPInput from '@/components/otp'
import React from 'react'

type Props = {
    setOTP: React.Dispatch<React.SetStateAction<string>>
    onOTP: string
}

export default function OTPForm({
    setOTP,
    onOTP
}: Props) {
  return (
    <>
        <h2 className='text-gravel md:text-4xl font-bold'>
            Tek kullanımlık Şifre
        </h2>
        <p className='text-iridium md:text-sm'>
             Lütfen tek kullanımlık şifreyi giriniz sonrasında size bir doğrulama maili göndereceğiz
        </p>
        <div className='w-full justify-center flex py-5'>
            <OTPInput 
                otp={onOTP}
                setOtp={setOTP}
            />
        </div>
    </>
  )
}