import { onGetCurrentDomainInfo } from '@/actions/settings/index.'
import BotTrainingForm from '@/components/forms/settings/bot-training'
import SettingsForm from '@/components/forms/settings/form'
import InfoBar from '@/components/infobar'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        domain: string
    }
}

async function DomainSettingsPage({params}: Props) {
  const domain = await onGetCurrentDomainInfo(params.domain)

  if(!domain) redirect('/dashboard')


  return (
    <>
        <InfoBar />
        <SettingsForm
           plan={domain.subscription?.plan}
           chatBot={domain.domains[0]?.chatBot}
           id={domain.domains[0]?.id}
           name={domain.domains[0]?.name}
        />
        <BotTrainingForm id={domain.domains[0]?.id} />
    </>
  )
}

export default DomainSettingsPage