import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="flex flex-col h-screen relative ">
      <div className=" absolute z-10  inset-x-0 px-4 lg:py-4 py-2 lg:px-8 flex  bg-[#202020fa] text-primary-foreground  shadow-lg">
        <div className="flex flex-1 items-center gap-x-4  text-sm font-semibold leading-6 text-gray-900">
          <Skeleton className="relative h-8 w-8 bg-slate-100  rounded-full" />

          <div className="flex flex-col gap-[6px]">
            <Skeleton className=" rounded-sm  bg-slate-50 w-20 h-3"></Skeleton>
            <Skeleton className=" rounded-sm  bg-slate-50 w-14 h-3"></Skeleton>
          </div>
        </div>
      </div>

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
              <div className="flex py-2">
                <Skeleton className=" w-[150px] mx-2 order-2 items-start h-10" />
              </div>
              <div className="flex">
                <Skeleton className="space-y-2 w-[200px] mx-2 order-2 items-start h-10" />
              </div>
              <div className="flex justify-end ">
                <Skeleton className="space-y-2 w-[150px] mx-2 order-1  items-end h-10 "></Skeleton>
              </div>
              <div className="flex justify-end py-2 ">
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
    </div>
  );
};

export default Loading;
