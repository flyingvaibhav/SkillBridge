import React from 'react'
import { useEffect } from 'react'
import { serverURL } from '../App'
import { setUserData } from '../redux/userSlice';

const getCurrentUser = () => {
const dispatch = useDispatch();

 useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverURL + '/api/user/getcurrentuser', { withCredentials: true });
        dispatch(setUserData(result.data));
        {
        }      } catch (error) {
            console.error('error')
            dispatch(setUserData(null));
        }
    }
    fetchUser();
}, [])

}

export default getCurrentUser
