import InfoBar from '@/components/infobar'
import BillingSettings from '@/components/settings/billing-settings'
import ChangePassword from '@/components/settings/change-password'
import DarkModetoggle from '@/components/settings/dark-mode'
import React from 'react'

type Props = {}

function SettingsPage({}: Props) {
  return (
  <>
   <InfoBar />
   <div className='overflow-y-auto w-full flex flex-col gap-10'>
        <BillingSettings />
        <DarkModetoggle />
        <ChangePassword />
   </div>
  </>
  )
}

export default SettingsPage