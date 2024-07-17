'use client'

import { useConversation } from '@/hooks/conversations/use-conversation';
import React from 'react'
import TabsMenu from '../tabs';
import { TABS_MENU } from '@/constants/menu';
import { TabsContent } from '../ui/tabs';
import ConversationSearch from './search';
import Loader from '../loader';
import { CardDescription } from '../ui/card';
import ChatCard from './chat-card';
import { Separator } from '../ui/separator';

type Props = {
    domains?:
    | {
        name: string;
        id: string;
        icon: string
    }[]
    | undefined
}

export default function ConversationMenu({ domains }: Props) {
    const { register, chatRooms, loading, onGetActiveChatMessages } = useConversation();


    console.log(chatRooms, 'chatRooms')
    return (
        <div className='py-3 px-0'>
            <TabsMenu triggers={TABS_MENU}>
                <TabsContent value='unread'>
                    <ConversationSearch
                        domains={domains}
                        register={register}
                    />

                    <Loader loading={loading}>

                        {
                            chatRooms?.length > 0 ? (
                                chatRooms.map((room) => (
                                    <ChatCard
                                        seen={room.chatRoom[0].message[0]?.seen}
                                        id={room.chatRoom[0].id}
                                        onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                                        createdAt={room.chatRoom[0].message[0]?.createdAt}
                                        key={room.chatRoom[0]?.id}
                                        title={room.email}
                                        description={room.chatRoom[0].message[0]?.message}
                                    />
                                ))
                            ) : (
                                <CardDescription>
                                    Bu alan adına ait sohbet bulunamadı
                                </CardDescription>
                            )

                        }
                    </Loader>
                </TabsContent>

                <TabsContent value='all'>
                    <Separator orientation='horizontal' 
                     className='mt-5'
                    />
                </TabsContent>
                <TabsContent value='expired'>
                    <Separator orientation='horizontal'
                    className='mt-5'
                    />
                </TabsContent>
                <TabsContent value='starred'>
                    <Separator orientation='horizontal'
                    className='mt-5'
                    />
                </TabsContent>
           
            </TabsMenu>
        </div>
    )
}