'use client'
import React from 'react'

type Props = {}


function Messenger({}: Props) {
    const {
        messageWindowRef,
        chats,
        loading,
        chatRoom,
        onHandleSentMessage
    } = useChatWindow()
  return (
    <div>Messenger</div>
  )
}

export default Messenger