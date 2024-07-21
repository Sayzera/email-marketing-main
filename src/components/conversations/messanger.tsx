"use client";
import { useChatWindow } from "@/hooks/conversations/use-conversation";
import React from "react";
import Loader from "../loader";
import Bubble from "../chatbot/bubble";

type Props = {};

function Messenger({}: Props) {
  const { messageWindowRef, chats, loading, chatRoom, onHandleSentMessage } =
    useChatWindow();
  return (
    <div className="flex-1 flex flex-col h-0 relative">
      <div className="flex-1 h-0 w-full flex flex-col">
        <Loader loading={loading}>
          <div
            ref={messageWindowRef}
            className="w-full flex-1 h-0 flex flex-col gap-3 pl-5 py-5 chat-window overflow-y-auto"
          >

          {
              chats?.length ? (

                chats?.map((chat) => (
                    <Bubble
                      key={chat.id}
                      message={{
                        role:chat.role!,
                        content: chat.message
                      }}
                      createdAt={chat.createdAt}
                    />
                ))
              ) : (
                <div>
                  Herhangi bir chat seçilmedi
                </div>
              )
          }
          </div>
        </Loader>
      </div>
    </div>
  );
}

export default Messenger;
