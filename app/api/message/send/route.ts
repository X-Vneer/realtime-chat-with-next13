import { generatePusherKey } from "@/helpers/utils";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherSever } from "@/lib/pusher";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    // getting req body
    const { text, chatId } = (await req.json()) as {
      text: string;
      chatId: string;
    };
    if (!text || !chatId)
      return new Response("invalid body params", { status: 422 });

    // getting user session
    const session = await getServerSession(authOptions);

    if (!session || !chatId.includes(session.user.id))
      return new Response("Unauthorized", { status: 401 });

    // extacting ids and verify both users are friends
    const [firstUserId, secondUserId] = chatId.split("--");
    if (!firstUserId || !secondUserId)
      return new Response("invalid chatId", { status: 422 });

    const areFriends = await db.sismember(
      `user:${firstUserId}:friends`,
      secondUserId
    );

    if (!areFriends) return new Response("Unauthorized", { status: 401 });

    // partner data
    const partnerId = chatId.startsWith(session.user.id)
      ? secondUserId
      : firstUserId;
    // const partner = (await

    const timestamp = Date.now();
    const message: Message = {
      id: nanoid(),
      senderId: session.user.id,
      text,
      receiverId: partnerId,
      timestamp,
    };

    pusherSever.trigger(
      generatePusherKey(`chat:${chatId}`),
      "incomming_message",
      message
    );
    pusherSever.trigger(
      generatePusherKey(`user:${partnerId}:chat`),
      "new_unseen_message",
      message
    );

    const [partner] = await Promise.all([
      db.get<User>(`user:${partnerId}`),
      db.zadd(`chat:${chatId}:messages`, {
        score: timestamp,
        member: message,
      }),
    ]);

    return new Response("ok");
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
