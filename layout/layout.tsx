import React from 'react'

export default function layout({children}) {
    return(
        <div className='flex min-h-screen bg-blue-400'>
            <div className='m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2'>
                <div className='bg-green-200 rounded-l-md flex items-center justify-center'>
                    Images
                </div>
                <div className='rightjustify-evenly'>
                    <div className='text-center py-10'>
                        {children}
                    </div>
                </div>
            </div>
            
        </div>
    )
}
