import { db } from "@/lib/db";

export default async function getFriendsByUserId(userId: string) {
  const friendIdsArray = await db.smembers(`user:${userId}:friends`);

  const friends = await Promise.all(
    friendIdsArray.map(async (id) => await db.get<User>(`user:${id}`))
  );

  return friends.filter(Boolean);
}
