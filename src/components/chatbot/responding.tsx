import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'

type Props = {}

export default function Responding({}: Props) {
  return (
    <div className='self-start flex items-end gap-3'>
        <Avatar className='w-5 h-5'>
            <AvatarImage
             src='https://github.com/shadcn.png'
             alt='@shadcn'
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='chat-bubble'>
            <div className='typing'>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
            </div>
        </div>
    </div>
  )
}