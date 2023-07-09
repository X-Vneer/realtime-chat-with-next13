"use client"
import { cn } from "@/src/lib/utils"
import React, { useEffect, useRef, useState } from "react"
import ChatInput from "./ChatInput"
import { AlertTriangle, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { useRealTimeUpdates } from "@/src/hooks/useRealTimeUpdates"
import axios from "axios"
import ChatLoading from "./ChatLoading"

type Props = {
  sessionId: string
  partnerId: string
  chatId: string
}

const ChatContainer = ({ sessionId, partnerId, chatId }: Props) => {
  const scrollDownRef = useRef<HTMLDivElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    setIsLoading(true)
    let cancel = false

    const fetchChat = async (chatId: string) => {
      try {
        const response = await axios.get<Message[]>(
          `/api/chats?chatId=${chatId}`
        )
        if (!cancel) {
          setMessages(response.data)
          setError(false)
        }
      } catch (error) {
        if (!cancel) {
          setError(true)
        }
      } finally {
        if (!cancel) {
          setIsLoading(false)
        }
      }
    }
    fetchChat(chatId)

    return () => {
      cancel = true
    }
  }, [chatId])

  const handleScrollToButtomChat = () => {
    if (!scrollDownRef.current) return
    scrollDownRef.current.scrollIntoView()
  }

  // handle formate time stamp
  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "HH:mm")
  }

  const triggerFun = (newMessage: Message) => {
    if (newMessage.senderId === sessionId) return
    setMessages((pre) => [newMessage, ...pre])
  }
  useRealTimeUpdates({
    channel: `chat:${chatId}`,
    event: "incomming_message",
    triggerFun,
  })
  if (isLoading) return <ChatLoading />
  if (error) return null
  return (
    <>
      <div id="messages" className="    flex  flex-col justify-center">
        <div className=" overflow-y-auto h-[93vh] md:h-screen px-4 pt-[80px] pb-[90px] scrollbar-thumb-rounded scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-w-2">
          <div className="flex flex-col-reverse   min-h-full  shrink-0 grow gap-4 mt-auto">
            <div className="w-full h-[1px]" ref={scrollDownRef}></div>
            {messages.map((message, index) => {
              const userMessage = message?.senderId === sessionId
              const messageForTheSameUser =
                messages[index - 1]?.senderId === messages[index]?.senderId

              return (
                <div
                  className="----chat-message------"
                  key={`${message.id}--${message.timestamp}`}
                >
                  <div className={cn("flex", { "justify-end": userMessage })}>
                    <div
                      className={cn(
                        "flex flex-col space-y-2 text-base max-w-xs mx-2",
                        userMessage
                          ? "order-1  items-end"
                          : "order-2 items-start"
                      )}
                    >
                      <p
                        className={cn(
                          "p-4 py-2 rounded-lg  inline-flex  items-center whitespace-pre ",
                          userMessage
                            ? "bg-[#222] text-white"
                            : "bg-gray-300  text-gray-900 flex-row-reverse ",
                          {
                            "rounded-br-none":
                              !messageForTheSameUser && userMessage,
                            "rounded-bl-none":
                              !messageForTheSameUser && !userMessage,
                            "bg-red-600": message.isError,
                          }
                        )}
                      >
                        {message.text}{" "}
                        <span
                          className={cn(
                            " text-[10px] text-gray-400 self-end ",
                            userMessage ? "ml-2" : "mr-2"
                          )}
                        >
                          {formatTimestamp(message.timestamp)}
                        </span>
                        {message.isLoading ? (
                          <Loader2 className="mx-2 h-4 w-4 shrink-0 self-end animate-spin" />
                        ) : null}
                        {message.isError ? (
                          <AlertTriangle className="h-4 w-4 mx-3 self-end" />
                        ) : null}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
            {/* <div className="w-full h-[1px]" ref={scrollDownRef}></div> */}
          </div>
        </div>
      </div>
      <ChatInput
        chatId={chatId}
        handleScrollToButtomChat={handleScrollToButtomChat}
        partnerId={partnerId}
        sessionId={sessionId}
        setMessages={setMessages}
      />
    </>
  )
}

export default ChatContainer
