"use client";
import { generateChateId } from "@/helpers/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Badge from "./ui/Badge";

type Props = {
  friends: (User | null)[];
  sessionId: string;
};

const SidebarChats = ({ friends, sessionId }: Props) => {
  const router = useRouter();
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

  return (
    <div>
      <ul role="list" className="max-h-[30vh] overflow-y-auto space-y-1">
        {friends.sort().map((friend) => {
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
                prefetch={false}
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
