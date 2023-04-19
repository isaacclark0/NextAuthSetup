import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import React,{useState} from 'react'
import { getSession,useSession, signOut } from 'next-auth/react'


export default function Home() {
  const { data: session } = useSession()
  function handleSignout(){
    signOut()
  }
  return (
    <div>
      <Head>
          <title>Home</title>
        </Head>
      {session ? AuthUser({ session, handleSignout }) : Guest()}
    </div>
  )
}

//GUEST
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
        <h3 className='text-4xl font-bold'>Guest Homepage</h3>
        <div className='flex justify-center'>
          <Link href='/login' className='mt-5 px-10 py-1 rounded-md bg-indigo-500 text-gray-200 hover:bg-indigo-200 hover:text-gray-500'>Login</Link>
        </div>
      </main>
  )
}
//AUTHED USER
function AuthUser({session, handleSignout}){
  return(
    <main className="container mx-auto text-center py-20">
        <h3 className='text-4xl font-bold'>Authorized User Homepage</h3>
        <div>
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
        </div>
        <div className='flex justify-center'><button onClick={handleSignout} className='mt-5 px-10 py-1 rounded-md bg-indigo-500 text-gray-200 hover:bg-indigo-200 hover:text-gray-500'>Sign Out</button></div>
        <div className='flex justify-center'>
          <Link href='/profile' className='mt-5 px-10 py-1 rounded-md bg-indigo-500 text-gray-200 hover:bg-indigo-200 hover:text-gray-500'>Profile</Link>
        </div>
      </main>
  )
}

export async function getServerSideProps({req}) {
  const session = await getSession({req})
  if(!session){
    return{
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return{
    props: {session}
  }
}