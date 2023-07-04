import React from 'react'

type Props = {
    friends: (User | null)[],
    sessionId: string,

}

const SidebarChats = ({ friends }: Props) => {
    return (
        <div>
            <ul role='list' className='max-h-[30vh] overflow-y-auto space-y-1'>
                {
                    friends.sort().map((friend) => {
                        if (!friend) return null
                        return <li key={friend.id}>{friend.name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default SidebarChats