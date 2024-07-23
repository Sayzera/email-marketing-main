'use client'

import { cn, extractUUIDFromString } from '@/lib/utils'
import React from 'react'
import { Avatar, AvatarImage,AvatarFallback } from '../ui/avatar'
import { User } from 'lucide-react'
import { getMonth } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

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
                    <Avatar className='w-5 h-5'>
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>
                )
            }

            <div className={cn('flex flex-col gap-3 min-w-[200px] max-w-[300px] p-4 rounded-lg', 
                message?.role === 'assistant' ? 'bg-muted rounded-r-md' : 'bg-grandis  rounded-l-md'

            )}>
                {
                    createdAt ? (
                        <div className='flex gap-2 text-xs text-gray-600'>
                            <p>
                                {createdAt.getDate()} {getMonth(
                                    createdAt.getMonth()
                                )}
                            </p>
                            <p>
                                {createdAt.getHours() }: {createdAt.getMinutes()}
                                {
                                    createdAt.getHours() > 12 ? 'PM' : 'AM'
                                }
                            </p>
                        </div>
                    ): (
                        <p className='text-xs'>
                            {
                                `${d.getHours()} : ${d.getMinutes()} ${d.getHours() > 12 ? 'pm': 'am'}`
                            }
                        </p>
        
                    )
                }
                {
                    image ? (
                        <div className='relative aspect-square'>
                            <Image
                             src={`https://ucarecdn.com/${image[0]}`}
                             fill
                             alt='image'
                            />

                        </div>
                    ): (
                        <p className='text-sm'>
                           {
                            message.content.replace('(complete)', ' ')
                           }
                           {
                            message?.link && (
                                <Link
                                 className='underline font-bold pl-2'
                                 href={message.link}
                                 target='_blank'
                                >
                                    your link
                                </Link>
                            )
                           }
                        </p>
                    )
                }

            </div>
    </div>
  )
}