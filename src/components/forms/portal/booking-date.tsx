'use client';
import { Calendar } from "@/components/ui/calendar"

import { CardDescription } from '@/components/ui/card';
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
    date: Date | undefined
    onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>
    onBack():void
    register: UseFormRegister<FieldValues>
    onSlot(slot:string):void
    currentSlot?:string
    loading:boolean
    bookings: 
        | {
            date: Date
            slot: string
        }[]
        | undefined
}

export default function BookAppointmentDate({
    date,
    onBooking,
    onBack,
    register,
    onSlot,
    currentSlot,
    loading,
    bookings
}: Props) {
  return (
    <div className='flex flex-col gap-5 justify-center'>
        <div className='flex justify-center'>
            <h2 className='text-4xl font-bold mb-5'>Randevu oluştur</h2>
        </div>
        <div className='flex gap-10'>
            <div className='w-[300px]'>
                <h6>Keşif Görüşmesi</h6>

                <CardDescription>
                    <p>Keşif görüşmesi, hizmetlerimiz hakkında detaylı bilgi alabileceğiniz bir görüşmedir. .</p>
                </CardDescription>
            </div>
            <Calendar 
                mode='single'
                selected={date}
                onSelect={onBooking}
                className="rounded-md border"
            />
        </div>
    </div>
  )
}