import React from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {};

const ChatLoading = (props: Props) => {
  return (
    <>
      <div id="messages" className=" py-2   flex  flex-col justify-center">
        <div className=" overflow-y-auto h-[calc(100vh-120px)] px-4 pt-[70px] scrollbar-thumb-rounded scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-w-2">
          <div className="flex flex-col-reverse   shrink-0 grow gap-4 mt-auto">
            <div className="flex justify-end ">
              <Skeleton className="space-y-2 w-[220px] mx-2 order-1  items-end h-10 "></Skeleton>
            </div>
            <div className="flex  ">
              <Skeleton className="space-y-2 w-[200px] mx-2 order-2 items-start h-10" />
            </div>
            <div className="flex justify-end ">
              <Skeleton className="space-y-2 w-[220px] mx-2 order-1  items-end h-10 "></Skeleton>
            </div>
            <div className="flex  ">
              <Skeleton className="space-y-2 w-[200px] mx-2 order-2 items-start h-10" />
            </div>
            <div className="flex justify-end ">
              <Skeleton className="space-y-2 w-[180px] mx-2 order-1  items-end h-10 "></Skeleton>
            </div>
            <div className="flex  ">
              <Skeleton className="space-y-2 w-[270px] mx-2 order-2 items-start h-10" />
            </div>
            <div className="flex justify-end ">
              <Skeleton className="space-y-2 w-[220px] mx-2 order-1  items-end h-10 "></Skeleton>
            </div>
            <div className="flex  ">
              <Skeleton className="space-y-2 w-[200px] mx-2 order-2 items-start h-10" />
            </div>
            <div className="flex ">
              <Skeleton className=" w-[150px] mx-2 order-2 items-start h-10" />
            </div>
            <div className="flex">
              <Skeleton className="space-y-2 w-[200px] mx-2 order-2 items-start h-10" />
            </div>
            <div className="flex justify-end ">
              <Skeleton className="space-y-2 w-[150px] mx-2 order-1  items-end h-10 "></Skeleton>
            </div>
            <div className="flex justify-end  ">
              <Skeleton className=" w-[250px] mx-2 order-1  items-end h-10" />
            </div>
            <div className="flex justify-end  ">
              <Skeleton className="space-y-2 w-[150px] mx-2 order-1  items-end h-10" />
            </div>
            <Skeleton className="space-y-2 w-[100px] mx-2 order-2 items-start h-10" />
            <div className="flex justify-end ">
              <Skeleton className="space-y-2 w-[220px] mx-2 order-1  items-end h-10 "></Skeleton>
            </div>
            <div className="flex  ">
              <Skeleton className="space-y-2 w-[240px] mx-2 order-2 items-start h-10" />
            </div>
          </div>
        </div>
      </div>
      {/* <ChatInput
    chatId={chatId}
    handleScrollToButtomChat={handleScrollToButtomChat}
    partnerId={partnerId}
    sessionId={sessionId}
    setMessages={setMessages}
  /> */}
    </>
  );
};

export default ChatLoading;
