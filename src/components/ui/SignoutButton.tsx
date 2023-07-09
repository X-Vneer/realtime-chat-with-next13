'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Loader2, LogOut } from 'lucide-react'



interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { };

const SignoutButton = (props: Props) => {
    const [isSigningOut, setIsSigningOut] = useState(false)

    // singout 
    const handleSignout = async () => {
        setIsSigningOut(true);
        try {

            await signOut()

        } catch (error) {
            toast.error('Could not signout, Try later!')

        } finally {
            setIsSigningOut(false)
        }

    }

    return (
        <Button {...props} variant={'ghost'} onClick={handleSignout} >
            {
                isSigningOut ? <Loader2 className=' animate-spin  h-4 w-4' /> : <LogOut className='w-4 h-4' />
            }

        </Button>
    )
}

export default SignoutButton