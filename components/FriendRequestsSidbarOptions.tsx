'use client'
import { User } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'

type Props = {
    sessionId: string,
    initialUnseenFriendRequestCount: number,
}

const FriendRequestsSidbarOptions = ({ initialUnseenFriendRequestCount, sessionId }: Props) => {

    const [UnseenFriendRequest, setUnseenFriendRequest] = useState(initialUnseenFriendRequestCount)
    return (
        <Link href='/dashboard/requests'
            className=" text-gray-700  hover:bg-gray-50 group flex items-center gap-3 rounded-md p-2 text-sm font-semibold  duration-300"
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
                UnseenFriendRequest ? <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-500 group-hover:bg-indigo-600 duration-300 !leading-[0]'>
                    {UnseenFriendRequest}
                </div> : null
            }
        </Link>
    )
}

export default FriendRequestsSidbarOptions