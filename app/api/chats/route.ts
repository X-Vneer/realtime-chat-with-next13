import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { arrayMessageValidator } from "@/lib/validation/message";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");
    if (!chatId) return new Response("no Chat provided", { status: 422 });

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { user } = session;
    const [firstUserId, secondUserId] = chatId.split("--");
    if (!firstUserId || !secondUserId)
      return new Response("Invalid chatId", { status: 422 });

    // verfiy chat id inclues user id
    if (!chatId.includes(user.id))
      new Response("User do not have access to this chat", { status: 401 });

    //  verfiy partner exsit
    const partnerId = chatId.startsWith(user.id) ? secondUserId : firstUserId;
    const chatPartner = (await db.get(`user:${partnerId}`)) as User;
    if (!chatPartner) return new Response("unfound user", { status: 404 });

    const dbMessages = (await db.zrange(
      `chat:${chatId}:messages`,
      0,
      -1
    )) as Message[];
    const reversedMessages = dbMessages.reverse();

    const messages = arrayMessageValidator.parse(reversedMessages);

    return NextResponse.json(messages);
  } catch (error) {
    return new Response(`internal server error:${error}`, { status: 500 });
  }
}
