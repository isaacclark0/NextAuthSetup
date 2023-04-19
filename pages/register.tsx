import React,{useState} from 'react'
import Head from 'next/head'
import Layout from '@/layout/layout'
import Link from 'next/link'
import Image from 'next/image'
import {AiFillEye} from 'react-icons/ai'
import { useFormik } from 'formik'
import { register_val } from '@/lib/validate'
import { useRouter } from 'next/router'
import { spawn } from 'child_process'

const register = () => {
    const [showPw, setShowPw] = useState({pw: false, cpw: false})
    const [error, setError] = useState()
    const router = useRouter()
    const formik = useFormik({
      initialValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validate: register_val,
      onSubmit
    })
    async function onSubmit(values){
      const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(values)
      }
      await fetch('http://localhost:3000/api/auth/signup', options)
      .then(res=>res.json())
      .then((res) => {
        
        if(res.message === 'User already exists, try a different email.'){
          setError(res.message)
        } else{
          setError(null)
          if(res.user){
             router.push('http://localhost:3000')
          }
        }
        
      })
    }
  return (
    <Layout>
        <Head>
            <title>Register</title>
        </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
          <div className="title">
              <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
              <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
          <div className="flex border rounded-xl">
              <input className='w-full py-3 px-6 rounded-xl bg-slate-50 focus:outline-none' type="text" placeholder='Username' {...formik.getFieldProps('username')} />
            </div>
            {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></> }
            <div className="flex border rounded-xl">
              <input className='w-full py-3 px-6 rounded-xl bg-slate-50 focus:outline-none' type="email" placeholder='Email' {...formik.getFieldProps('email')} />
            </div>
            {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></> }
            <div className="flex border rounded-xl relative">
              <input className='w-full py-3 px-6 rounded-xl bg-slate-50 focus:outline-none input_text'
               type={`${showPw.pw ? 'text' : 'password'}`} 
               placeholder='Password'
               {...formik.getFieldProps('password')} />
              <span className='flex items-center px-4 hover:cursor-pointer hover:text-slate-700' onClick={() => setShowPw({...showPw, pw:!showPw.pw})}><AiFillEye size={25} /></span>
            </div>
            {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></> }
            <div className="flex border rounded-xl relative">
              <input className='w-full py-3 px-6 rounded-xl bg-slate-50 focus:outline-none input_text'
               type={`${showPw.cpw ? 'text' : 'password'}`}
               placeholder='Confirm Password'
               {...formik.getFieldProps('confirmPassword')} />
              <span className='flex items-center px-4 hover:cursor-pointer hover:text-slate-700' onClick={() => setShowPw({...showPw, cpw:!showPw.cpw})}><AiFillEye size={25} /></span>
            </div>
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? <span className='text-rose-500'>{formik.errors.confirmPassword}</span> : <></> }
            <div className="input-button">
              <button className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-1 text-gray-50 text-lg hover:bg-gradiet-r hover:from-slate-200 hover:to-slate-200  hover:text-gray-700' type='submit'>Register</button>
            </div>
            {error ? <span className='text-rose-500'>{error}</span>:<></>}
            
          </form>
          <p className='text-center text-gray-400'>Already Have an Account? <Link className='text-blue-700' href='/login'>Login</Link></p>
        </section>
    </Layout>
  )
}

export default register