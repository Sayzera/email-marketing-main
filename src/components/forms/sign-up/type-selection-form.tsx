'use client'


import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

type Props = {
    register: UseFormRegister<FieldValues>
    userType: 'owner' | 'student'
    setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

function TypeSelectionForm({
    register,
    setUserType,
    userType
}: Props) {
    return (
        <>
            <h2 className='text-gravel md:text-4xl font-bold'>Hesap oluştur</h2>
            <p className='text-iridium md:text-sm'>
                Bize kendinizden bahset! Neler yapıyorsun? Hadi sana göre uyarlayalım.
                <br />
                size en uygun olanı deneyimleyin.
            </p>
            <UserTypeCard
                register={register}
                setUserType={setUserType}
                userType={userType}
                value='owner'
                title='Bir şirketim var'
                text='Şirketim için hesap oluşturuyorum!'
            />

            <UserTypeCard
                register={register}
                setUserType={setUserType}
                userType={userType}
                value='student'
                title='Ben öğrenciyim'
                text='Bu uygulama hakkında bilgi toplamak ve öğrenmek için buradayım.'
            />

       
        </>
    )
}

export default TypeSelectionForm