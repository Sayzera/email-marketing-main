'use client';

import Image from 'next/image';
import React from 'react'

type Props = {}

export default function PortalBanner({}: Props) {
  return (
    <div className='w-full bg-muted flex justify-center py-5'>
        <Image 
            src='/images/logo.png'
            alt='logo'
            sizes='100vw'
            style={{
                width:'100px',
                height:'auto'
            }}
            width={0}
            height={0}
            
        />
    </div>
  )
}