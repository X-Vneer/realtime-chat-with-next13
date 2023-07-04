import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { Icons } from "@/components/Icons";
import type { Icon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SignoutButton from "@/components/ui/SignoutButton";
import FriendRequestsSidbarOptions from "@/components/FriendRequestsSidbarOptions";
import getFriendsByUserId from "@/helpers/get-friends-by-user-id";
import { db } from "@/lib/db";
import SidebarChats from "@/components/SidebarChats";

type SidebarOptions = {
    id: number;
    name: string;
    href: string;
    Icon: Icon;
};

// to force dynamic pages
export const dynamic = 'force-dynamic'

const sidebarOptions: SidebarOptions[] = [
    {
        id: 1,
        name: "Add Friend",
        href: "/dashboard/add-friends",
        Icon: "UserPlus",
    },
];
export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    // getting initialUnseenFriendRequestCount
    const initialUnseenFriendRequestCount = (await db.smembers(`user:${session.user.id}:incoming_friend_requests`)).length


    // fetching friends
    const friends = await getFriendsByUserId(session.user.id)

    return (
        <main className="flex min-h-screen ">
            <div className=" w-full max-w-xs flex flex-col gap-y-6 border-r border-r-gray-200  bg-white p-4 lg:p-6 ">
                <Link href={"/dashboard"} className="flex h-16 w-fit items-center">
                    <Icons.Logo className="h-8 text-indigo-600" />
                </Link>

                <div>
                    <p className="font-semibold text-gray-400 text-xs">Your Chats</p>
                </div>

                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-4">
                        <li>
                            <SidebarChats friends={friends} sessionId={session.user.id} />
                        </li>
                        <li>
                            <div>
                                <p className="text-xs font-semibold leading-6 text-gray-400">
                                    Overview
                                </p>
                                <ul role="list" className=" mt-2 space-y-2">
                                    {sidebarOptions.map((option) => {
                                        const Icon = Icons[option.Icon];
                                        return (
                                            <li key={option.id}>
                                                <Link
                                                    href={option.href}
                                                    className=" text-gray-700  hover:bg-gray-100 group flex items-center gap-3 rounded-md p-2 text-sm font-semibold  duration-300"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className=" group-hover:bg-accent duration-300 shrink-0"
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                    </Button>
                                                    <span className="truncate">{option.name}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                    <li>
                                        <FriendRequestsSidbarOptions sessionId={session.user.id} initialUnseenFriendRequestCount={initialUnseenFriendRequestCount} />
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className=" mt-auto flex items-center">
                            <div className="flex flex-1 items-center gap-x-4 px-1 py-3 text-sm font-semibold leading-6 text-gray-900">
                                <div className="relative h-8 w-8 bg-gray-50">
                                    <Image
                                        fill
                                        referrerPolicy="no-referrer"
                                        className="rounded-full"
                                        src={session.user.image || ""}
                                        alt="Your profile picture"
                                    />
                                </div>

                                <span className="sr-only">Your profile</span>
                                <div className="flex flex-col">
                                    <span aria-hidden="true">{session.user.name}</span>
                                    <span className="text-xs text-zinc-400" aria-hidden="true">
                                        {session.user.email}
                                    </span>
                                </div>
                            </div>

                            <SignoutButton />
                        </li>
                    </ul>
                </nav>
            </div>

            {children}
        </main>
    );
}
