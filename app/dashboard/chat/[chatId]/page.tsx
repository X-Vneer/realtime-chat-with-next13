import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { arrayMessageValidator } from "@/lib/validation/message";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";


type Props = {
    params: { chatId: string }
}


// 
async function chatMessages(chatId: string) {

    try {
        const dbMessages = (await db.zrange(`chat:${chatId}:messages`, 0, -1)) as Message[]
        const reversedMessages = dbMessages.reverse()

        const messages = arrayMessageValidator.parse(reversedMessages)

        return messages

    } catch (error) {

        if (error) notFound()
    }


}

export default async function Chat({ params: { chatId } }: Props) {

    const session = await getServerSession(authOptions)
    if (!session) redirect("/login");


    const { user } = session

    // chats id will follow this covenstion (userId--userId)
    const [firstUserId, secondUserId] = chatId.split('--')

    // retun 404 not found if the user id is not included in the chat
    if (!chatId.includes(user.id)) notFound()

    const partnerId = chatId.startsWith(user.id) ? secondUserId : firstUserId

    const chatPartner = (await db.get(`user:${partnerId}:`)) as User
    if (!chatPartner) return notFound()







    return <div>Chat {chatId}</div>;
}