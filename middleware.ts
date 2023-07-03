import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(

    async function (req) {
        const pathName = req.nextUrl.pathname


        // mange route protection
        const isAuth = await getToken({ req })
        console.log("🚀 ~ file: middleware.ts:14 ~ isAuth:", isAuth)

        if (isAuth && pathName.startsWith("/login")) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        if (pathName === '/') {
            return NextResponse.redirect(new URL('/login', req.url))
        }

        return NextResponse.next()
    }, {
    callbacks: {
        async authorized() {
            return true
        }
    }
}

)

export const config = {

    matcher: ['/', '/login']
}
