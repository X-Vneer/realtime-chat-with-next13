"use client";
import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import axios from "axios";

type Props = {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    sessionId: string,
    partnerId: string,
    handleScrollToButtomChat: () => void,
    chatId: string,
};

const ChatInput = ({ setMessages, partnerId, sessionId, handleScrollToButtomChat, chatId }: Props) => {
    const textAreRef = useRef<HTMLTextAreaElement>(null);

    // dynamicly resizing text area
    const textRowCount = textAreRef.current
        ? textAreRef.current.value.split("\n").length
        : 0;
    const rows = textRowCount <= 3 ? textRowCount : 4;

    const [inputMessage, setInputMessage] = useState("");
    const handleInputMessageChange: React.ChangeEventHandler<
        HTMLTextAreaElement
    > = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        const messageId = Math.random() + '' + new Date().getTime();
        const message = {
            id: messageId,
            senderId: sessionId,
            receiverId: partnerId,
            text: inputMessage,
            timestamp: new Date().getTime(),
            isLoading: true,
            isError: false
        }
        if (!inputMessage) return
        setMessages((pre) => [...pre, message])
        setInputMessage('')
        handleScrollToButtomChat()
        textAreRef.current?.focus()

        try {

            const response = await axios.post('/api/message/send', { text: inputMessage, chatId })
            console.log("🚀 ~ file: ChatInput.tsx:52 ~ handleSendMessage ~ response:", response)


        } catch (error) {

            setMessages(pre => pre.map(e => {
                if (e.id === messageId) return ({
                    ...e, isLoading: false,
                    isError: true,
                })
                return e
            }))


        } finally {
            setMessages(pre => pre.map(e => {
                if (e.id === messageId) return ({
                    ...e, isLoading: false,
                })
                return e
            }))
        }

    };
    // handleing sending messgae using enter key
    const handleEnterKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
        e
    ) => {
        const keyDown = e.key;
        if (keyDown === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage();
        }
    };

    return (
        <div className="border-t border-gray-200 px-4 pb-10 pt-2 sm:mb-0 flex gap-3  items-center">
            <Textarea
                ref={textAreRef}
                rows={rows}
                placeholder="your message..."
                value={inputMessage}
                onChange={handleInputMessageChange}
                onKeyDown={handleEnterKeyDown}
                className=" resize-none min-h-[40px] grow"
            />
            <div>
                <Button onClick={handleSendMessage} className="  h-10">
                    <SendIcon className=" shrink-0" />
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;
