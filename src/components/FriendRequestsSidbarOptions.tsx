"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Badge from "./ui/Badge";
import { useRealTimeUpdates } from "@/src/hooks/useRealTimeUpdates";
import { usePathname } from "next/navigation";

type Props = {
  sessionId: string;
  initialUnseenFriendRequestCount: number;
};

const FriendRequestsSidbarOptions = ({
  initialUnseenFriendRequestCount,
  sessionId,
}: Props) => {
  const [UnseenFriendRequest, setUnseenFriendRequest] = useState(
    initialUnseenFriendRequestCount
  );

  // real time incomming req
  const triggerFun = () => {
    setUnseenFriendRequest((pre) => ++pre);
  };
  useRealTimeUpdates({
    channel: `user:${sessionId}:incoming_friend_requests`,
    event: "incoming_friend_requests",
    triggerFun,
  });

  const pathName = usePathname();

  useEffect(() => {
    // marking chats as seen if navigated to
    if (pathName.includes("requests")) {
      setUnseenFriendRequest(0);
    }
  }, [pathName]);

  return (
    <Link
      href="/dashboard/requests"
      className=" text-gray-700  hover:bg-gray-100 group flex items-center gap-3 rounded-md p-2 text-sm font-semibold  duration-300"
    >
      <Button
        variant="outline"
        size="icon"
        className=" group-hover:bg-accent duration-300 shrink-0"
      >
        <User className="h-4 w-4" />
      </Button>
      <p className="truncate">Friend requests</p>

      {UnseenFriendRequest ? <Badge>{UnseenFriendRequest}</Badge> : null}
    </Link>
  );
};

export default FriendRequestsSidbarOptions;
