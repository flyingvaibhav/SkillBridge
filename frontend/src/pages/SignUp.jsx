import React from 'react'
import logo from '../assets/logo.png'

function SignUp() {
  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center '>  
    
    <form  className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex'>
{/* left div */}


<div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>

<div>
<h1 className='font-semibold text-[black] text-2xl'> let's get started</h1>
<h2 className='text-[black] text-[18px]'> Create your account</h2>
</div>

{/* NAME */}
<div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>


    <label htmlFor="name" className='font-semibold'>Name</label>
    <input type="text" id="name" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px ] 'placeholder='YOUR NAME'/>

</div>

{/* EMAIL */}
<div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>


    <label htmlFor="name" className='font-semibold'>Name</label>
    <input type="text" id="name" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px ] 'placeholder='EMAIL'/>

</div>

{/* PASSWORD */}
<div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>


    <label htmlFor="password" className='font-semibold'>Password</label>
    <input type="text" id="password" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px ] 'placeholder='YOUR PASSWORD'/>

</div>


<div className='flex md:w-[50%] w-[70%] items-center justify-between'>
<span className='px-[10px] py-[5px]  rounded-2xl cursor-pointer'> Student</span>
<span>EDUCATOR</span>
</div>

</div>



{/* right div */}
<div className='w-[50%] h-[100%] rounded-r-2xl bg-gray-300 md:flex items-center justify-center flex-col hidden'>
    <img src={logo} alt=" logo " className='w-30 shadow-2xl' />
<span  className='text-2xl text-white'>SKILLBRIDGE </span>
</div>


    </form>
    
    </div>
  )
}

export default SignUp