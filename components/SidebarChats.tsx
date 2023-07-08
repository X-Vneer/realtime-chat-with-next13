"use client";
import { generateChateId } from "@/helpers/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Badge from "./ui/Badge";
import { useRealTimeUpdates } from "@/hooks/useRealTimeUpdates";

type Props = {
  intialFriends: (User | null)[];
  sessionId: string;
};

const SidebarChats = ({ intialFriends, sessionId }: Props) => {
  const [chats, setChats] = useState(intialFriends);

  const pathName = usePathname();

  const [unSeenMegs, setUnSeenMegs] = useState<Message[]>([]);

  useEffect(() => {
    // marking chats as seen if navigated to
    if (pathName.includes("chat")) {
      setUnSeenMegs((pre) =>
        pre.filter((meg) => !pathName.includes(meg.senderId))
      );
    }
  }, [pathName]);

  // real time added friends
  const triggerFun = (newFriend: User) => {
    setChats((pre) => [...pre, newFriend]);
  };

  useRealTimeUpdates<User>({
    channel: `user:${sessionId}:chats`,
    event: "new_friend_accepted",
    triggerFun,
  });

  const newMessageTriggerFun = (message: Message) => {
    if (
      message.senderId === sessionId ||
      window.location.href.includes(message.senderId)
    )
      return;
    setUnSeenMegs((pre) => [message, ...pre]);
  };

  useRealTimeUpdates({
    channel: `user:${sessionId}:chat`,
    event: "new_unseen_message",
    triggerFun: newMessageTriggerFun,
  });

  return (
    <div>
      <ul role="list" className="max-h-[40vh] overflow-y-auto space-y-1">
        {chats.sort().map((friend) => {
          if (!friend) return null;
          const unSeenMegsCount = unSeenMegs.filter(
            (meg) => meg.senderId === friend.id
          ).length;
          return (
            <li key={friend.id}>
              <Link
                href={`/dashboard/chat/${generateChateId(
                  sessionId,
                  friend.id
                )}`}
                className="flex flex-1 items-center gap-x-4 px-2 py-3 rounded-md text-sm font-semibold leading-6 text-gray-900 duration-300 hover:bg-slate-100"
              >
                <div className="relative h-8 w-8 ">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={friend.image || ""}
                    alt="Your profile picture"
                  />
                </div>

                <p>{friend.name}</p>

                {unSeenMegsCount ? <Badge>{unSeenMegsCount}</Badge> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarChats;
