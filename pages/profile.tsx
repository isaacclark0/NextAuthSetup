import React from 'react'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'

const profile = ({session}) => {
  return (
    <section className='container mx-auto text-center'>
        <h3 className='text-4xl font-bold'>Profile Page</h3>
        <h3>Hello {session.user.name}</h3>
        <Link href={'/'}>Home</Link>
    </section>
  )
}

export default profile

export async function getServerSideProps({req}){
    const session = await getSession({req})
    //redirect user to login if there is no session
    if(!session){
        return{
            redirect: {
                destination: 'login',
                permanent: false
            }
        }
    }
    //else return the session
    return {
        props: {session}
    }
}