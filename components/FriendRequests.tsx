'use client'

import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'

type Props = {
    initialIncomingFriendRequests: IncomingFriendRequest[],
    sessionId: string,

}

const FriendRequests = ({ initialIncomingFriendRequests, sessionId }: Props) => {
    const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(initialIncomingFriendRequests)

    if (!friendRequests.length) return <p className='text-sm text-zinc-500 '>You do not have any incoming friend requests</p>
    return (
        <div>
            {friendRequests.map(req => {
                return (
                    <div key={req.id} className='flex items-center gap-4'>
                        <div className="flex  items-center gap-x-4 px-1 py-3 text-sm font-semibold leading-6 text-gray-900">
                            <div className="relative h-8 w-8 bg-gray-50">
                                <Image
                                    fill
                                    referrerPolicy="no-referrer"
                                    className="rounded-full"
                                    src={req.image || ""}
                                    alt="profile picture"
                                />
                            </div>

                            <div className="flex flex-col">
                                <span >{req.name}</span>
                                <span className="text-xs text-zinc-400" >
                                    {req.email}
                                </span>
                            </div>
                        </div>
                        <div className='flex gap-3 ml-6'>
                            <Button variant='outline' className=' aspect-square' aria-label='accept friend'>
                                <Check className='h-6 w-6 shrink-0' />
                            </Button>

                            <Button variant='outline' className=' aspect-square' aria-label='deny friend'>
                                <X className='h-6 w-6 shrink-0' />
                            </Button>

                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default FriendRequests