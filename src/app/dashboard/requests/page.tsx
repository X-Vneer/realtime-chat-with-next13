import FriendRequests from "@/src/components/FriendRequests";
import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// export const dynamic = 'force-dynamic'
export default async function RequestsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // ids of people who sent current logged in user a friend requests
  const incomingFriendIds = await db.smembers(
    `user:${session.user.id}:incoming_friend_requests`
  );

  // getting emails

  const incomingFriendRequests = await Promise.all(
    incomingFriendIds.map(async (id) => {
      const response = (await db.get(`user:${id}`)) as User;
      return response;
    })
  );
  return (
    <section className="p-4 lg:p-8 grow max-h-screen overflow-y-auto">
      <h1 className="mb-6 lg:mb-8  text-3xl lg:text-5xl font-bold  text-gray-900">
        Friend requests
      </h1>
      <div className="flex flex-col gap-3 lg:gap-4">
        <FriendRequests
          initialIncomingFriendRequests={incomingFriendRequests}
          sessionId={session.user.id}
        />
      </div>
    </section>
  );
}
