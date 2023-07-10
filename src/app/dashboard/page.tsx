import getFriendsByUserId from "@/src/helpers/get-friends-by-user-id"
import { authOptions } from "@/src/lib/auth"
import { generateChateId } from "@/src/helpers/utils"
import { ChevronRight } from "lucide-react"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/src/lib/db"

const page = async ({}) => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const friends = await getFriendsByUserId(session.user.id)

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessage] = await db.zrange<Message[]>(
        `chat:${generateChateId(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )

      return {
        ...friend,
        lastMessage,
      }
    })
  )

  return (
    <div className=" p-8 grow">
      <h1 className="font-bold text-3xl lg:text-5xl mb-8">Recent chats</h1>
      {friendsWithLastMessage.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        friendsWithLastMessage.map((friend) => (
          <div
            key={friend.id}
            className="relative bg-zinc-50 border border-zinc-200 space-y-3 p-3 rounded-md"
          >
            <div className="absolute right-4 inset-y-0 flex items-center">
              <ChevronRight className="h-7 w-7 text-zinc-400" />
            </div>

            <Link
              href={`/dashboard/chat/${generateChateId(
                session.user.id,
                friend.id
              )}`}
              className="relative flex gap-2 items-center"
            >
              <div className="  shrink-0  sm:mr-4">
                <div className="relative h-8 w-8">
                  <Image
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    alt={`${friend.name} profile picture`}
                    src={friend.image}
                    fill
                  />
                </div>
              </div>

              <div>
                <h4 className="md:text-lg font-semibold">{friend.name}</h4>
                <p className="mt-1 max-md:text-sm max-w-md">
                  <span className="text-zinc-400">
                    {friend.lastMessage.senderId === session.user.id
                      ? "You: "
                      : ""}
                  </span>
                  {friend.lastMessage.text}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default page
