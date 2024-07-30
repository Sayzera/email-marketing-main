import PortalBanner from '@/components/portal/banner'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function Layout({
    children
}: Props) {
  return (
    <div className='flex flex-coll h-screen'>
        <PortalBanner />
        <div className='container flex justify-center flex-1 h-0'>
            {children}
        </div>
    </div>
  )
}