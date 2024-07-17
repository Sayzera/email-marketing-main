
import { onLoginUser } from '@/actions/auth';
import Sidebar from '@/components/sidebar';
import { ChatProvider } from '@/context/user-chat-contex';
import React from 'react'

type Props = {
    children:React.ReactNode
}

export default async function OwnerLayout({
    children
}: Props) {
  const authenticated = await onLoginUser();

  if(!authenticated) return null

  return (
    <ChatProvider>
      <div className='flex h-screen w-full'>
        <Sidebar domains={authenticated.domain} />

        <div className='w-full h-screen flex flex-col py-3 pr-10 pl-20 md:px-10'>
          {children}
        </div>
      </div>
    </ChatProvider>
  )
}