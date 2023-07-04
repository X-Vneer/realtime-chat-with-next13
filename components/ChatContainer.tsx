'use client'
import { cn } from '@/lib/utils'
import React, { useRef, useState } from 'react'

type Props = {
    initialMessages: Message[],
    sessionId: string,
}

const ChatContainer = ({ initialMessages, sessionId }: Props) => {
    const scrollDownRef = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState(initialMessages)
    return (
        <div id='messages' className="p-4 h-full flex flex-col-reverse  gap-4  scrollbar-thumb-rounded scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-w-2">
            <div ref={scrollDownRef}></div>
            {messages.map((message, index) => {
                const userMessage = message.id === sessionId;
                const messageForTheSameUser = messages[index - 1].senderId === messages[index].senderId;

                return (
                    <div className='----chat-message------' key={`${message.id}--${message.timestamp}`}>
                        <div className={cn('flex', { 'justify-end': userMessage })}>
                            <div className={
                                cn('flex flex-col space-y-2 text-base max-w-xs mx-2',
                                    userMessage ? 'order-1  items-end' : "order-2 items-start",)}
                            >
                                <span className={cn("p-4 py-2 rounded-lg inline-block ",
                                    userMessage ? 'bg-[#222] text-white' : "bg-gray-300  text-gray-900 ",
                                    (!messageForTheSameUser && userMessage) ? 'rounded-br-none' : "rounded-bl-none"
                                )}>
                                    {message.text} {' '} <span className='ml-2 text-[10px] text-gray-400'>{message.timestamp}</span>
                                </span>
                            </div>

                        </div>
                    </div>
                )



            })}
        </div>
    )
}

export default ChatContainer