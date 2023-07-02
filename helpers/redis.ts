const upstashRedisURL = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

// 
type Command = 'zrange' | 'sismember' | 'get' | 'smembers'


export async function fetchRedis(
    command: Command,
    ...args: (string | number)[]
) {

    const commandURL = `${upstashRedisURL}/${command}/${args.join("/")}`
    const response = await fetch(commandURL, {
        headers: {
            Authorization: `Bearer ${upstashToken}`
        },
        // to prevent next 13 defalt caching
        cache: 'no-store'
    })


    if (!response.ok) {
        throw Error(`Error executing Redis command: ${response.statusText}`)
    }

    const data = await response.json()

    return data.result

}