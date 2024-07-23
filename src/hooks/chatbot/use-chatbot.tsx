
'use client'

import { postToParent } from "@/lib/utils"
import { ChatBotMessageProps, ChatBotMessageSchema } from "@/schemas/conversation.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { use, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

export const useChatBot = () => {
     
    // WIP: Setup Realtime with pusher
    const { register, handleSubmit, reset } =
        useForm<ChatBotMessageProps>({
            resolver: zodResolver(ChatBotMessageSchema)
        })

    const [currentBot, setCurrentBot] = useState<
        | {
            name: string
            chatBot: {
                id: string
                icon: string | null
                welcomeMessage: string | null
                background: string | null
                textColor: string | null
                helpdesk: boolean
            } | null
            helpdesk: {
                id: string
                question: string
                answer: string
                domainId: string | null
            }[]
        }
        | undefined

    >()

    const messageWindowRef  = useRef<HTMLDivElement | null>(null)
    const [botOpened, setBotOpened] = useState<boolean>(false)
    const onmOpenChatBot = () => setBotOpened((prev) => !prev)
    const [onChats, setOnChats] = useState<
        {
            role: 'assistant' | 'user'
            content: string
            link?:string
        }[]
    >
    const [onAiTyping, setOnAiTyping] = useState<boolean>(false)
    const [currentBotId, setCurrentBot]  = useState<string>()
    const [onRealtime, setOnRealtTime] = useState<{
        chatroom:string
        mode:boolean
    } | undefined>

    const onScrollToBottom = () => {

        messageWindowRef?.current?.scrollTo({
            top: messageWindowRef.current.scrollHeight,
            left:0,
            behavior: 'smooth'
        })
    }



    useEffect(() => {
        onScrollToBottom()
    }, [onScrollToBottom, messageWindowRef])


    useEffect(() => {
        postToParent(
            JSON.stringify({
                width: botOpened ? 550 :80,
                height: botOpened ? 800 : 80
            })
        )
    },[botOpened])

    let limitRequest =0 

    useEffect(() => {  
        window.addEventListener('message', (e) => {
            const botid = e.data
        })

        if(limitRequest < 1 && typeof botid ==='string') {
            onGetDomainChatBot(botid)
            limitRequest++
        }
    }, [])



}