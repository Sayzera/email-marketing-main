"use client";

import { onAiChatBotAssistant, onGetCurrentChatBot } from "@/actions/bot";
import { postToParent, pusherClient } from "@/lib/utils";
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
} from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { UploadClient } from "@uploadcare/upload-client";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

export const useChatBot = () => {
  // WIP: Setup Realtime with pusher
  const { register, handleSubmit, reset } = useForm<ChatBotMessageProps>({
    resolver: zodResolver(ChatBotMessageSchema),
  });

  const [currentBot, setCurrentBot] = useState<
    | {
        name: string;
        chatBot: {
          id: string;
          icon: string | null;
          welcomeMessage: string | null;
          background: string | null;
          textColor: string | null;
          helpdesk: boolean;
        } | null;
        helpdesk: {
          id: string;
          question: string;
          answer: string;
          domainId: string | null;
        }[];
      }
    | undefined
  >();

  const messageWindowRef = useRef<HTMLDivElement | null>(null);
  const [botOpened, setBotOpened] = useState<boolean>(false);
  const onOpenChatBot = () => setBotOpened((prev) => !prev);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [onChats, setOnChats] = useState<
    {
      role: "assistant" | "user";
      content: string;
      link?: string;
    }[]
  >([]);
  const [onAiTyping, setOnAiTyping] = useState<boolean>(false);
  const [currentBotId, setCurrentBotId] = useState<string>();
  const [onRealtime, setOnRealtTime] = useState<
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined
  >();

  const onScrollToBottom = useCallback(() => {
    messageWindowRef?.current?.scrollTo({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    onScrollToBottom();
  }, [onScrollToBottom, messageWindowRef]);

  useEffect(() => {
    postToParent(
      JSON.stringify({
        width: botOpened ? 550 : 80,
        height: botOpened ? 800 : 80,
      })
    );
  }, [botOpened]);

  let limitRequest = 0;


  // İlk başta karşılama hooku
  useEffect(() => {
    window.addEventListener("message", (e) => {
      const botid = e.data;
      if (limitRequest < 1 && typeof botid === "string") {
        onGetDomainChatBot(botid);
        limitRequest++;
      }
    });
  }, []);


  // Bot idyi alır 
  const onGetDomainChatBot = async (id: string) => {
    setCurrentBotId(id);

    const chatbot = await onGetCurrentChatBot(id);

    if (chatbot) {
      setOnChats(
        (
          prev: {
            role: "assistant" | "user";
            content: string;
            link?: string;
          }[]
        ) => [
          ...prev,
          {
            role: "assistant",
            content: chatbot.chatBot?.welcomeMessage!,
          },
        ]
      );

      setCurrentBot(chatbot);
      setLoading(false);
    }
  };

  const onStartChatting = handleSubmit(async (values) => {

    if (values?.image?.length) {
      const uploaded = await upload.uploadFile(values.image[0])
      // if (!onRealTime?.mode) {
        setOnChats((prev: any) => [
          ...prev,
          {
            role: 'user',
            content: uploaded.uuid,
          },
        ])
      // }

      setOnAiTyping(true)
      const response = await onAiChatBotAssistant(
        currentBotId!,
        onChats,
        'user',
        uploaded.uuid
      )

      if (response) {
        setOnAiTyping(false)
        if (response.live) {
          // setOnRealTime((prev) => ({
          //   ...prev,
          //   chatroom: response.chatRoom,
          //   mode: response.live,
          // }))
        } else {
          setOnChats((prev: any) => [...prev, response.response])
        }
      }
    }
    reset()

    if (values.content) {
      // if (!onRealTime?.mode) {
        setOnChats((prev: any) => [
          ...prev,
          {
            role: 'user',
            content: values.content,
          },
        ])
      // }

      setOnAiTyping(true)

      const response = await onAiChatBotAssistant(
        currentBotId!,
        onChats,
        'user',
        values.content
      )

      if (response) {
        setOnAiTyping(false)
        if (response.live) {
          // setOnRealTime((prev) => ({
          //   ...prev,
          //   chatroom: response.chatRoom,
          //   mode: response.live,
          // }))
        } else {
          setOnChats((prev: any) => [...prev, response.response])
        }
      }
    }
  })

  return {
    botOpened,
    onOpenChatBot,
    onStartChatting,
    onChats,
    register,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading: isLoading,
    setOnChats,
    onRealtime,
  };
};

export const useRealTime = (
  chatRoom: string,
  setChats: React.Dispatch<
    React.SetStateAction<{
      role: "user" | "assistant";
      content: string;
      link?: string;
    }[]>
  >
) => {
  useEffect(() => {
    pusherClient.subscribe(chatRoom)
    pusherClient.bind('realtime-mode', (data:any) => {
      setChats((prev) => [
        ...prev,
        {
          role: data.chat.role,
          content: data.chat.content,
        }
      ])
    })


    return () => pusherClient.unsubscribe('realtime-mode')

  }, [chatRoom]);
};
