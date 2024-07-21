'use client'

import { cn, extractUUIDFromString } from '@/lib/utils'
import React from 'react'
import { Avatar, AvatarImage,AvatarFallback } from '../ui/avatar'

type Props = {
    message: {
        role: 'assistant' | 'user'
        content: string
        link?:  string
    }
    createdAt: Date
}

export default function Bubble({
    message,
    createdAt
}: Props) {
    const d = new Date()
    const image = extractUUIDFromString(message?.content)
    // 5:31
  return (
    <div className={cn(
        'flex gap-2 items-end',
        message.role === 'assistant' ? 'self-start' : 'self-end flex-row-reverse'
    )}>

            {
                message.role === 'assistant' ? (
                    <Avatar>
                        <AvatarImage 
                            src='https://github.com/shadcn.png'
                            alt='@shadcn'
                            />
                            <AvatarFallback>{'@shadcn'}</AvatarFallback>
                    </Avatar>
                ): (
                    <Avatar className='5-'>

                    </Avatar>
                )
            }
    </div>
  )
}