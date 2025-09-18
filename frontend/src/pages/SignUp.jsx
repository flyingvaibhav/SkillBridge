import React, { useState } from 'react'
import logo from '../assets/logo.png'
import google from '../assets/gogglelogo.jpeg'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../App';
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners'

function SignUp() {

    const [show , setShow]= useState(false)
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default role is 'student'

    const [loading, setLoading] = useState(false);

const handleSignUp = async () => {
 setLoading(true);
    // Implement sign-up logic here, e.g., form validation, API call, etc.
try{
   
    const result =await axios.post(serverURL + '/api/auth/signup', {
        name,
        email,
        password,
        role
        
    }
    , { withCredentials: true });
    console.log(result.data);
    setLoading(false);

    navigate('/');
    toast.success("SignUp Successful");
}
catch(error){
    console.error(error);
    setLoading(false);
    toast.error(error.response.data.message);
}
}
  return (  
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center '>  

    <form  className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex' onSubmit={(e) => { e.preventDefault();  handleSignUp()}}>
{/* left div */}


<div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>

<div>
<h1 className='font-semibold text-[black] text-2xl'> let's get started</h1>
<h2 className='text-[black] text-[18px]'> Create your account</h2>
</div>

{/* NAME */}
<div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>


    <label htmlFor="name" className='font-semibold'>Name</label>
    <input type="text" id="name" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px ] 'placeholder='YOUR NAME' onChange={(e) => setName(e.target.value)} value={name} />

</div>

{/* EMAIL */}
<div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>


    <label htmlFor="email" className='font-semibold'>Email</label>
    <input type="text" id="email" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px ] 'placeholder=' YOUR EMAIL' onChange={(e) => setEmail(e.target.value)} value={email} />

</div>

{/* PASSWORD */}
<div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>


    <label htmlFor="password" className='font-semibold'>Password</label>
    <input id='password' type={ show ? 'text' : 'password'} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px ] 'placeholder='YOUR PASSWORD' onChange={(e) => setPassword(e.target.value)} value={password}/>
{ !show ? 
<IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev=>!prev)} />:
<IoEye  className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev=>!prev)} /> }


</div>

{/* for the 2 section educator and students */}
<div className='flex md:w-[50%] w-[70%] items-center justify-between'>
<span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-2xl cursor-pointer hover:border-black' ${role === 'student' ?  'border-black' : 'border-[#646464]'}`} onClick={() => setRole('student')}> Student</span>


<span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-2xl cursor-pointer hover:border-black' ${role === 'educator' ?  'border-black' : 'border-[#646464]'}`} onClick={() => setRole('educator')}> EDUCATOR</span>
</div>

{/* submit button */}
<button className='w-[80%] h-[40px] bg-black text-white rounded-2xl cursor-pointer flex items-center justify-center rounded-[5px]'    onClick={handleSignUp} disabled={loading}>
   {loading ? <ClipLoader size={30} color={'white'}/> : "Sign Up"}
</button>
<div className='w-[80%] flex items-center gap-2'>
<div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
<div className='w-[50%] text-[15px]  text-[#6f6f6f] flex items-center justify-center'>Or Continue</div>
<div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
</div>

<div  className='w-[80%] h-[40px] border-1 border-[black]   rounded-[5px] flex items-center justify-center'>
    <img src={google} className='w-[25px]' alt="" />
    <span className='text-[18px] text-gray-500' >Continue with Google</span>
    
</div>
<div className='text-[#6f6f6f] '>already have an account?
  <span className='underline underline-offset-1 text-[black]' onClick={() => navigate('/login')}>Login</span>

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