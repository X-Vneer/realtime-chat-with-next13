'use client'

import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-hot-toast'

type Props = {
    initialIncomingFriendRequests: IncomingFriendRequest[],
    sessionId: string,

}

const FriendRequests = ({ initialIncomingFriendRequests, sessionId }: Props) => {
    const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(initialIncomingFriendRequests)
    const [isTakingAction, setIsTakingAction] = useState<string[]>([])


    // accepting friend requests
    const acceptFriend = async (id: string) => {
        setIsTakingAction(pre => [...pre, id])
        try {
            await axios.post('/api/friends/requests/accept', { id })
            setFriendRequests(pre => pre.filter(req => req.id !== id))
            toast.success('Friend added successfully')


        } catch (error) {
            console.log("🚀 ~ file: FriendRequests.tsx:31 ~ acceptFriend ~ error:", error)
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data || 'Could not accept a friend request, Please try later')
                return
            }
            toast.error('Could not accept a friend request, Please try later')
        } finally {
            setIsTakingAction(pre => pre.filter(item => item !== id))
        }

    }
    // denying friend requests
    const denyFriend = async (id: string) => {
        setIsTakingAction(pre => [...pre, id])
        try {
            await axios.post('/api/friends/requests/deny', { id })
            setFriendRequests(pre => pre.filter(req => req.id !== id))
            toast.success('Denyed a friend request successfully')


        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data || 'Could not deny a friend request, Please try later')
                return
            }
            toast.error('Could not deny a friend request, Please try later')
        } finally {
            setIsTakingAction(pre => pre.filter(item => item !== id))
        }

    }

    if (!friendRequests.length) return <p className='text-sm text-zinc-500 '>You do not have any incoming friend requests</p>
    return (
        <div>
            {friendRequests.map(req => {
                const isLoading = isTakingAction.includes(req.id)
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
                            <Button disabled={isLoading} onClick={() => acceptFriend(req.id)} isLoading={isLoading} variant='outline' className=' aspect-square' aria-label='accept friend'>

                                {!isLoading ? <Check className='h-6 w-6 shrink-0' /> : null}

                            </Button>

                            <Button disabled={isLoading} onClick={() => denyFriend(req.id)} isLoading={isLoading} variant='outline' className=' aspect-square' aria-label='deny friend'>
                                {!isLoading ? <X className='h-6 w-6 shrink-0' /> : null}
                            </Button>

                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default FriendRequests