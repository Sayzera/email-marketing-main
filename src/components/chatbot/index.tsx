

import { useChatBot } from '@/hooks/chatbot/use-chatbot';
import React, { useRef, useState } from 'react'
import BotWindow from './window';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { BotIcon } from 'lucide-react';

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


    console.log(currentBot, 'currentBot')



    
  return (
    <div className='h-screen flex flex-col justify-end items-end gap-4'>
       {
        botOpened ? 
          <BotWindow
          setChat={setOnChats}
          realTimeMode={onRealtime}
          helpdesk={currentBot?.helpdesk!}
          domainName={currentBot?.name!}
          ref={messageWindowRef}
          help={currentBot?.chatBot?.helpdesk}
          theme={currentBot?.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTyping}
        /> :( 
          <div className={cn(
            'rounded-full relative cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis',
            loading ? 'invisible' : 'visible'
          )}
          onClick={onOpenChatBot}
          >
           {
            currentBot?.chatBot?.icon ? (
              <Image 
              src={`https://ucarecdn.com/${currentBot?.chatBot?.icon}`}
              alt='bot'
              fill

              />
            ): (
              <BotIcon /> 
            )
           }
          </div>
        )
       }
    </div>
  )
}