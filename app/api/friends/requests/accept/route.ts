import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
    try {

        const body = await req.json()

        const { id: toAddId } = z.object({ id: z.string() }).parse(body)

        // making sure user is authorized
        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }


        // checking user has reseved a friend req
        const haveAFriendReq = (await fetchRedis('sismember', `user:${session.user.id}:incoming_friend_requests`, toAddId)) as 0 | 1

        if (!haveAFriendReq) {
            return new Response('Could not accept this user, they did NOT send you a friend request yet', { status: 400 })

        }

        // adding friends to each other and clean friend requests
        await Promise.all([
            db.sadd(`user:${session.user.id}:friends`, toAddId),
            db.sadd(`user:${toAddId}:friends`, session.user.id),
            db.srem(`user:${session.user.id}:incoming_friend_requests`, toAddId),
        ])

        return new Response('OK')

    } catch (error) {

        if (error instanceof z.ZodError) {

            return new Response("Invalid ID", { status: 422 })
        }

        return new Response("Invalid request", { status: 400 })


    }

}