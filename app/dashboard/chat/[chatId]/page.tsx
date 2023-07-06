import ChatContainer from "@/components/ChatContainer";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { arrayMessageValidator } from "@/lib/validation/message";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: { chatId: string };
};

//
async function chatMessages(chatId: string) {
  try {
    const dbMessages = (await db.zrange(
      `chat:${chatId}:messages`,
      0,
      -1
    )) as Message[];
    // const reversedMessages = dbMessages.reverse()

    const messages = arrayMessageValidator.parse(dbMessages);

    return messages;
  } catch (error) {
    if (error) notFound();

    return [];
  }
}

export default async function Chat({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { user } = session;

  // chats id will follow this covenstion (userId--userId)
  const [firstUserId, secondUserId] = chatId.split("--");

  // retun 404 not found if the user id is not included in the chat
  if (!chatId.includes(user.id)) notFound();

  const partnerId = chatId.startsWith(user.id) ? secondUserId : firstUserId;

  const chatPartner = (await db.get(`user:${partnerId}`)) as User;
  if (!chatPartner) return notFound();

  const initialMessages = await chatMessages(chatId);

  return (
    <div className="flex flex-col h-screen relative ">
      <div className=" absolute z-10  inset-x-0 px-4 lg:py-4 py-2 lg:px-8 flex  bg-[#202020fa] text-primary-foreground  shadow-lg">
        <div className="flex flex-1 items-center gap-x-4  text-sm font-semibold leading-6 text-gray-900">
          <div className="relative h-8 w-8 ">
            <Image
              fill
              referrerPolicy="no-referrer"
              className="rounded-full"
              src={chatPartner.image || ""}
              alt="Your profile picture"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-white">{chatPartner.name}</span>
            <span className="text-xs text-zinc-400">{chatPartner.email}</span>
          </div>
        </div>
      </div>

      <ChatContainer
        chatId={chatId}
        partnerId={partnerId}
        sessionId={session.user.id}
        initialMessages={initialMessages.reverse()}
      />
      {/* <ChatInput /> */}
    </div>
  );
}
