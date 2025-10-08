import React from 'react'
import logo from '../assets/logo.png'
import { IoPersonCircle } from 'react-icons/io5'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function Nav() {
const {userData} = useSelector((state) => state.user);
const navigate = useNavigate();
const dispatch = useDispatch();

const handleLogOut = () => async() => {
  try {
    const result= await axios.get(serverURL + "/api/auth/logout", {
      withCredentials: true,
    });
    dispatch(setUserData(null));
    console.log(result.data)
    toast.success("Logout Successfully");
  } catch (error) {
  
    console.log(error);
    toast.error(error.response.data.message);
    

  
  }
}
  return (

    <div>
   <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex justify-between items-center bg-[#00000047] z-10'>

<div className='lg:w-[20%] w-[40%] lg:p1-[50px] ' >
  <img src={logo} alt="" className='w-[60px] rounded-[5px] border-2 border-white' />
   </div>
 
 <div  className='w-[30%] lg:flex items-center justify-center gap-4'>
  { !userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer'/>}

{ userData && <div className='w-[50px] h-[50px] rounded-full  flex items-center justify-center text-[20px] text-white border-2 bg-black border-white cursor-pointer'>
  {userData?.name.slice(0,1).toUpperCase()}


</div>}





 { userData?.role ==='eduactor' && <div className='px-[20px] py-[10px] border-2 border-white text-white bg-[#121213] rounded-[10px] text-[18px] font-light cursor-pointer '> Dashboard</div>}
 { !userData ? <span className='px-[20px] py-[10px] border-2 border-white text-white bg-[#141718] rounded-[10px] text-[18px] font-light cursor-pointer  bg-[#000000d5]'  onClick={()=>navigate('/login')}>Login</span>:
  <span className='px-[20px] py-[10px] border-2 border-white text-white bg-[#161a1b] rounded-[10px] text-[18px] font-light cursor-pointer ' onClick={handleLogOut}> LogOut</span>}

  
 </div>

   </div>

    </div>
  )
}

export default Nav