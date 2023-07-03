import FriendRequests from "@/components/FriendRequests"
import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function RequestsPage() {

    const session = await getServerSession(authOptions)
    if (!session) redirect('/login')

    // ids of people who sent current logged in user a friend requests
    const incomingFriendIds = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`)) as string[]

    // getting emails

    const incomingFriendRequests = await Promise.all(
        incomingFriendIds.map(async (id) => {
            const response = (await fetchRedis('get', `user:${id}`))

            return (JSON.parse(response)) as IncomingFriendRequest


        })
    )
    console.log("🚀 ~ file: page.tsx:23 ~ RequestsPage ~ incomingFriendRequests:", incomingFriendRequests)

    return (
        <section className='p-8 grow'>
            <h1 className='mb-8  text-3xl lg:text-5xl font-bold  text-gray-900'>Friend requests</h1>
            <div className="flex flex-col gap-4">
                <FriendRequests initialIncomingFriendRequests={incomingFriendRequests} sessionId={session.user.id} />
            </div>
        </section>)
}