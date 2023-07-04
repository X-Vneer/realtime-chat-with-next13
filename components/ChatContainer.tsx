'use client'
import { cn } from '@/lib/utils'
import React, { useRef, useState } from 'react'
import ChatInput from './ChatInput'
import { AlertTriangle, Loader2 } from 'lucide-react'

type Props = {
    initialMessages: Message[],
    sessionId: string,
    partnerId: string,
    chatId: string,
}

const ChatContainer = ({ initialMessages, sessionId, partnerId, chatId }: Props) => {
    const scrollDownRef = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState(initialMessages)

    const handleScrollToButtomChat = () => {
        if (!scrollDownRef.current) return
        scrollDownRef.current.scrollIntoView()
    }
    return (
        <>
            <div id='messages' className="px-4 py-2 h-full flex flex-col  justify-center  pt-[70px]   overflow-y-auto scrollbar-thumb-rounded scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-w-2">
                <div className='flex flex-col h-fit-content gap-4 mt-auto'>
                    {/* <div className='w-full h-[1px]' ref={scrollDownRef}></div> */}
                    {messages.map((message, index) => {
                        const userMessage = message.senderId === sessionId;
                        const messageForTheSameUser = messages[index - 1]?.senderId === messages[index].senderId;

                        return (
                            <div className='----chat-message------' key={`${message.id}--${message.timestamp}`}>
                                <div className={cn('flex', { 'justify-end': userMessage })}>
                                    <div className={
                                        cn('flex flex-col space-y-2 text-base max-w-xs mx-2',
                                            userMessage ? 'order-1  items-end' : "order-2 items-start",)}
                                    >
                                        <span className={cn("p-4 py-2 rounded-lg  inline-flex  items-center ",
                                            userMessage ? 'bg-[#222] text-white' : "bg-gray-300  text-gray-900 ",
                                            {
                                                'rounded-br-none':
                                                    !messageForTheSameUser && userMessage,
                                                'rounded-bl-none':
                                                    !messageForTheSameUser && !userMessage,
                                                'bg-red-600': message.isError,
                                            }

                                        )}>
                                            {message.text} {' '} <span className='ml-2 text-[10px] text-gray-400'>{new Date(message.timestamp).getHours()}</span>
                                            {message.isLoading ? <Loader2 className='mx-2 h-4 w-4 shrink-0 animate-spin' /> : null}
                                            {message.isError ? <AlertTriangle className='h-4 w-4 mx-3' /> : null}


                                        </span>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                    <div className='w-full h-[1px]' ref={scrollDownRef}></div>

                </div>
            </div>
            <ChatInput chatId={chatId} handleScrollToButtomChat={handleScrollToButtomChat} partnerId={partnerId} sessionId={sessionId} setMessages={setMessages} />
        </>
    )
}

export default ChatContainer