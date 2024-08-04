'use client';

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import QuestionsForm from './questions';
import BookAppointmentDate from './booking-date';

type Props = {
    questions: {
        id: string
        question: string
        answered: string | null
    }[]
    type: 'Appointment' | 'Payment'
    register: UseFormRegister<FieldValues>,
    error: FieldErrors<FieldValues>
    onNext():void
    step:number
    date: Date | undefined
    onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>
    onBack():void
    onSlot(slot:string):void
    slot?:string
    loading:boolean
    bookings?:
    | {
        date: Date;
        slot: string;
    }[]
    | undefined;
    products?:
    | {
       name:string
       image:string
       price:number 
    }[]
    | undefined
    amount?:number
    stripeId?:string
}

export default function PortalSteps({
    questions,
    type,
    register,
    error,
    onNext,
    step,
    date,
    onBooking,
    onBack,
    onSlot,
    slot,
    loading,
    bookings,
    products,
    amount,
    stripeId
}: Props) {

  console.log(step);
  if(step == 1 ) {
    return (
      <QuestionsForm
        register={register}
        error={error}
        onNext={onNext}
        questions={questions}
      />
    )
  }

  if(step == 2 && type == 'Appointment') {
    return (
      <BookAppointmentDate
        date={date}
        bookings={bookings}
        currentSlot={slot}
        register={register}
        onBack={onBack}
        onBooking={onBooking}
        onSlot={onSlot}
        loading={loading}
      />
    )
  }

  // if(step == 2 && type == 'Payment') {
  //   <PaymentCheckout 
  //     products={products}
  //     stripeId={stripeId}
  //     onBack={onBack}
  //     onNext={onNext}
  //     amount={amount}
  //   />
  // }


  return (
    <div>Portal Steps</div>
  )
}