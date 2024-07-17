
import { onGetSubscriptionPlan } from '@/actions/settings/index.';
import React from 'react'
import Section from '../section';
import { Card, CardContent, CardDescription } from '../ui/card';
import { Check, CheckCircle2, Plus } from 'lucide-react';
import { pricingCards } from '@/constants/landing-page';

type Props = {
}

export default async function BillingSettings({
}: Props) {
  // WIP: Add stripe subscription form.
    const plan = await onGetSubscriptionPlan();

    const planFeatures = pricingCards.find((card) => card.title.toUpperCase() === plan?.toUpperCase())
    ?.features
    
  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
        <div className='lg:col-span-1'>
            <Section 
                label="Fatura Ayarları"
                message='Ödeme bilgilerinizi ekleyin, ve hesabınızı yükseltin'
                />
        </div>

        <div className='lg:col-span2 flex justify-start lg:justify-center'>
          <Card className='border-dashed bg-cream border-gray-400 w-ful cursor-pointer w-full h-[270px]
           flex justify-center items-center
          '>
            <CardContent className='flex gap-2 items-center'>
              <div className='rounded-full border-2 p-1'>
                <Plus />
              </div>
              <CardDescription className='font-semibold'>
              Planı Yükselt
            </CardDescription>

            </CardContent>
        
          </Card>
        </div>
        
        <div className='lg:col-span2'>
          <h3 className='text-xl font-semibold mb-2'>Mevcut Plan</h3>
          <p className='text-sm font-semibold'>{plan}</p>
          {/* <p className='text-sm font-light'>
            {
              plan == 'PRO'
              ? 'Sınırsız kullanıcı, sınırsız proje, sınırsız depolama'
              : plan === 'ULTIMATE'
              ? 'Sınırsız kullanıcı, sınırsız proje, sınırsız depolama, öncelikli destek'
              : 'Sınırlı kullanıcı, sınırlı proje, sınırlı depolama'
            }
          </p> */}
          
      <div className='flex gap-[5px] flex-col mt-2'>
      {
            planFeatures?.map((feautre) => (
              <div
               key={feautre}
               className='flex gap-2'
              >
                <CheckCircle2
                 className='text-muted-foreground'
                />
                <p>{feautre}</p>

              </div>
            ))
          }
      </div>
      

        </div>

    </div>
  )
}