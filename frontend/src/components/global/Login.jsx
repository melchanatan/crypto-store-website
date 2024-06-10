'use server'
import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/session-provider'
// import { useRouter } from 'next/navigation'

const Login = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)
    
    if (session) {
        return (
            <div className='p-4'>
            <h1>hello, {session?.user.name}</h1>
        </div>
        )
    }
}

export default Login