import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validation/add-friends";
import { getServerSession } from "next-auth";
import { z } from 'zod'

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const { email: emailToAdd } = addFriendValidator.parse(body.email)

        // getting the person who send the req
        const session = await getServerSession(authOptions)

        // throwing an error if user is not authorized
        if (!session) {
            return new Response("Unauthorized", { status: 401 })
        }

        /*
         * if user tries to add himself as a friend
         */
        if (emailToAdd === session.user.email) {
            return new Response(`You can NOT add yourself as a Friend`, { status: 400 })
        }


        // getting to-add-user id
        const toAddId = (await fetchRedis(
            'get',
            `user:email:${emailToAdd}`
        )) as string


        if (!toAddId) {
            return new Response(`User with email ${emailToAdd} is NOT FOUND!`, { status: 400 })
        }

        // checking user if already added
        const isAlreadyAdded = (await fetchRedis('sismember', `uesr:${toAddId}:incoming_friend_requests`, session.user.id)) as 0 | 1

        if (isAlreadyAdded) {
            return new Response('Already added this user', { status: 400 })
        }

        // check if user is already friedn
        const isAlreadyFriend = (await fetchRedis('sismember', `uesr:${session.user.id}:friends`, toAddId)) as 0 | 1

        if (isAlreadyFriend) {
            return new Response('Already friend with this user', { status: 400 })
        }


        // sending frind requst

        db.sadd(`uesr:${toAddId}:incoming_friend_requests`, session.user.id)

        return new Response('OK')


    } catch (error) {

        if (error instanceof z.ZodError) {

            return new Response("Invalid Email", { status: 422 })
        }

    }
}