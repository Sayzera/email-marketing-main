"use client";
import { usePortal } from "@/hooks/portal/use-portal";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import PortalSteps from "./portal-steps";
import { Button } from "@/components/ui/button";

type Props = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  customerId: string;
  domainid: string;
  email: string;
  bookings?:
    | {
        date: Date;
        slot: string;
      }[]
    | undefined;
  products?:
    | {
        name: string;
        image: string;
        price: number;
      }[]
    | undefined;
  amount?: number;
  stripeId?: string;
};

export default function PortalForm({
  questions,
  type,
  customerId,
  domainid,
  email,
  bookings,
  products,
  amount,
  stripeId,
}: Props) {
  const {
    step,
    onNext,
    onPrev,
    register,
    errors,
    date,
    setDate,
    onBookAppointment,
    onSelectedTimeSlot,
    selectedSlot,
    loading,
  } = usePortal(customerId, domainid, email);

  useEffect(() => {
    if(questions.every((questions) => questions.answered)) {
      onNext()
    }
  }, [questions])


  return (


    <form
      className="h-full flex flex-col gap-10 justify-center"
      onSubmit={onBookAppointment}
    >
      <PortalSteps
        loading={loading}
        slot={selectedSlot}
        bookings={bookings}
        onSlot={onSelectedTimeSlot}
        date={date}
        onBooking={setDate}
        step={step}
        type={type}
        questions={questions}
        error={errors}
        register={register}
        onNext={() => onNext()}
        products={products}
        onBack={onPrev}
        amount={amount}
        stripeId={stripeId}
      />
    

    {
      (step == 1 || step == 2) && (
        <div className="w-full flex justify-center">
            <div className="w-[400px] grid grid-cols-2 gap-3"
             onClick={onPrev}
            >
              <div
                className={cn(
                  'rounded-full h-2 col-span-1',
                  step == 1 ? 'bg-orange' : 'bg-platinum'
                )}
              ></div>
              <div
              onClick={onNext}
              className={cn(
                'rounded-full h-2 col-span-1',
                step == 2 ? 'bg-orange' : 'bg-platinum'
              )}
              >
              </div>
            </div>
        </div>
      )
    }


    </form>



  );
}
