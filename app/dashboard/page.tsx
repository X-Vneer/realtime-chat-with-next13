import { authOptions } from "@/lib/auth"
import { getServerSession } from 'next-auth'

export default async function Dashboard() {

    // const section = await getServerSession(authOptions)
    const session = await getServerSession(authOptions)

    return <main>
        <pre>
            {JSON.stringify(session)}
        </pre>
        dashboard
    </main>
}