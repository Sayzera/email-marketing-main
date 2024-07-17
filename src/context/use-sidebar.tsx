'use client'
import { useToast } from '@/components/ui/use-toast';
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useChatContext } from './user-chat-contex';
import { onGetConversationMode, onToggleRealtime } from '@/actions/conversation';
import { useClerk } from '@clerk/nextjs';


export default function useSidebar() {
  const [expand, setExpand] = useState<boolean | undefined>(undefined)
  const router = useRouter();
  const pathname = usePathname()
  const { toast } = useToast();
  const [realtime, setRealtime] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { chatRoom} = useChatContext();

  const onActivteRealtime = async (e: any) => {
    try {
        const realtime = await  onToggleRealtime(
            chatRoom!,
            e.target.ariaChecked === 'true' ? false: true
        );  
    }catch(error) {
        console.log(error)
    }
  }

  const onGetCurretMode = async() =>{
    setLoading(true)
    const mode = await onGetConversationMode(chatRoom!)
    if(mode) {
        setRealtime(mode.live)
        setLoading(false)
    }
  }

  useEffect(() => {
    if(chatRoom) {
        onGetCurretMode();
    }
  }, [chatRoom])

  const page  = pathname.split('/').pop();
  const { signOut} = useClerk();

  const onSignOut = () => signOut(() =>router.push('/'))
  const onExpand = () => setExpand((prev) => !prev)


  return {
    expand,
    onExpand,
    page,
    onSignOut,
    realtime,
    onActivteRealtime,
    chatRoom,
    loading
  }
}