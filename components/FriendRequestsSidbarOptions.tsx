'use client'
import { User } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Badge from './ui/Badge'
import { pusherClient } from '@/lib/pusher'
import { generatePusherKey } from '@/helpers/utils'

type Props = {
    sessionId: string,
    initialUnseenFriendRequestCount: number,
}

const FriendRequestsSidbarOptions = ({ initialUnseenFriendRequestCount, sessionId }: Props) => {

    const [UnseenFriendRequest, setUnseenFriendRequest] = useState(initialUnseenFriendRequestCount)

    useEffect(() => {
        pusherClient.subscribe(generatePusherKey(`user:${sessionId}:incoming_friend_requests`))
        const friendRequestsHandler = () => { setUnseenFriendRequest(pre => ++pre) }
        pusherClient.bind('incoming_friend_requests', friendRequestsHandler)

        return () => {
            pusherClient.unsubscribe(`user:${sessionId}:incoming_friend_requests`)
            pusherClient.unbind('incoming_friend_requests', friendRequestsHandler)
        }

    }, [])
    return (
        <Link href='/dashboard/requests'
            className=" text-gray-700  hover:bg-gray-100 group flex items-center gap-3 rounded-md p-2 text-sm font-semibold  duration-300"
        >
            <Button
                variant="outline"
                size="icon"
                className=" group-hover:bg-accent duration-300 shrink-0"
            >
                <User className='h-4 w-4' />

            </Button>
            <p className='truncate'>Friend requests</p>

            {
                UnseenFriendRequest ?
                    <Badge>
                        {UnseenFriendRequest}
                    </Badge> : null
            }
        </Link>
    )
}

export default FriendRequestsSidbarOptions