

import { useChatBot } from '@/hooks/chatbot/use-chatbot';
import React, { useRef, useState } from 'react'

type Props = {}

export default function AiChatBot({}: Props) {

    const {
        onOpenChatBot,
        botOpened,
        onChats,
        register,
        onStartChatting,
        onAiTyping,
        messageWindowRef,
        currentBot,
        loading,
        onRealtime,
        setOnChats
    } = useChatBot();



    
  return (
    <div>index</div>
  )
}