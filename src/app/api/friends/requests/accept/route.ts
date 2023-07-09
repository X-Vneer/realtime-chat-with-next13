import { generatePusherKey } from "@/src/helpers/utils";
import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { pusherSever } from "@/src/lib/pusher";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    // making sure user is authorized
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { id: toAddId } = z.object({ id: z.string() }).parse(body);

    // checking user has reseved a friend req
    const haveAFriendReq = await db.sismember(
      `user:${session.user.id}:incoming_friend_requests`,
      toAddId
    );

    if (!haveAFriendReq) {
      return new Response(
        "Could not accept this user, they did NOT send you a friend request yet",
        { status: 400 }
      );
    }

    // adding friends to each other and clean friend requests
    const [addedFriend] = await Promise.all([
      db.get<User>(`user:${toAddId}`),
      db.sadd(`user:${session.user.id}:friends`, toAddId),
      db.sadd(`user:${toAddId}:friends`, session.user.id),
      db.srem(`user:${session.user.id}:incoming_friend_requests`, toAddId),
    ]);

    if (!addedFriend)
      return new Response(
        "Internal server error: Could not get added User data from the db",
        { status: 500 }
      );

    pusherSever.trigger(
      generatePusherKey(`user:${toAddId}:incoming_friend_requests`),
      "new_friend_accepted",
      {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        id: session.user.id,
      }
    );
    pusherSever.trigger(
      generatePusherKey(`user:${session.user.id}:incoming_friend_requests`),
      "new_friend_accepted",
      addedFriend
    );

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid ID", { status: 422 });
    }

    return new Response("Invalid request", { status: 400 });
  }
}
