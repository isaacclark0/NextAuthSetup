import React,{useState} from 'react'
import Head from 'next/head'
import Layout from '@/layout/layout'
import Link from 'next/link'
import Image from 'next/image'
import {AiFillEye} from 'react-icons/ai'
import { signIn, signOut } from 'next-auth/react'
import { useFormik } from 'formik'
import { login_val } from '@/lib/validate'
import { useRouter } from 'next/router'

const login = () => {
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState()
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: login_val,
    onSubmit
  })
  console.log(formik.errors)
  
  async function onSubmit(values){
    const status = await signIn('credentials',{
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/'
    })
    if(status.ok) router.push(status.url)
    if(status?.error) setError(status.error)
  }

  async function handleGoogleSignin() {
    signIn('google',{callbackUrl: 'http://localhost:3000'})
  }
  async function handleGithubSignin() {
    signIn('github',{callbackUrl: 'http://localhost:3000'})
  }

  return (
    <Layout>
        <Head>
            <title>Login</title>
        </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
          <div className="title">
              <h1 className='text-gray-800 text-4xl font-bold py-4'>Login</h1>
              <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
            <div className="flex border rounded-xl">
              <input className='w-full py-3 px-6 rounded-xl bg-slate-50 focus:outline-none' type="email" placeholder='Email' {...formik.getFieldProps('email')} />
            </div>
            {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></> }
            <div className="flex border rounded-xl relative">
              <input className='w-full py-3 px-6 rounded-xl bg-slate-50 focus:outline-none input_text'
               type={`${showPw ? 'text' : 'password'}`}
               placeholder='Password'
               {...formik.getFieldProps('password')}
                />
              <span className='flex items-center px-4 hover:cursor-pointer hover:text-slate-700' onClick={() => setShowPw(!showPw)}><AiFillEye size={25} /></span>
            </div>
            {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></> }
            <div className="input-button">
              <button className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-1 text-gray-50 text-lg hover:bg-gradiet-r hover:from-slate-200 hover:to-slate-200  hover:text-gray-700' type='submit'>Login</button>
            </div>
            {error ? <span className='text-rose-500'>{error}</span>:<></>}

            <div className="input-button">
              <button onClick={handleGoogleSignin} className='w-full border py-1 flex justify-center items-center gap-2 rounded-md hover:bg-gray-200' type='button'>
                Sign in With Google <Image src={'/images/google.png'} width={20} height={20} alt='google'></Image>
              </button>
            </div>
            <div className="input-button">
              <button onClick={handleGithubSignin} className='w-full border py-1 flex justify-center items-center gap-2 rounded-md hover:bg-gray-200' type='button'>
                Sign in With Github <Image src={'/images/github.svg'} width={20} height={20} alt='google'></Image>
              </button>
            </div>
          </form>
          <p className='text-center text-gray-400'>Don't Have an Account? <Link className='text-blue-700' href='/register'>Register</Link></p>
        </section>
    </Layout>
  )
}

export default login