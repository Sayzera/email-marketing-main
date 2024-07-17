import { onGetAllAccountDomains } from '@/actions/settings/index.'
import ConversationMenu from '@/components/conversations';
import Messenger from '@/components/conversations/messanger';
import InfoBar from '@/components/infobar';
import { Separator } from '@/components/ui/separator';
import React from 'react'

type Props = {}

export default async function ConversationPage({ }: Props) {
    const domains = await onGetAllAccountDomains();
    return (
        <div
            className='w-full h-full flex'
        >
            <ConversationMenu domains={domains?.domains} />
            <Separator
                orientation='vertical'
            />

            <div className='w-full flex flex-col'>
                <div className='px-5'>
                    <InfoBar />
                </div>

                <Messenger />
            </div>
        </div>
    )
}