import axios from 'axios';
import React, { useState } from 'react';
import { auth } from './firebaseAuth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function SignUp() {

    const [adminName, setAdminName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = async(e) =>{
        e.preventDefault();
        const userData = {
            name: adminName,
            username: email,
            password: password
        }

        console.log(userData);

        try {
            const response = await axios.post('http://localhost:8080/admin/signup', userData);
            // const response = await signInWithEmailAndPassword(username,password)

            if (response.status) { 
                const authReponse = await createUserWithEmailAndPassword(auth,email,password);

                await updateProfile(authReponse.user, {displayName:adminName});
            }
        } catch (error) { 
            console.error(error)
        }
     
    }

  return (
    <div className='text-center border rounded-md p-2 bg-gray-50 mr-3'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col  justify-center items-center gap-3'>
            <input className='border rounded-md p-1 bg-white' type='text' onChange={(e)=>setAdminName(e.target.value)}  placeholder='Name' value={adminName}/>
            <input  className='border rounded-md p-1 bg-white' type='email' onChange={(e)=>setEmail(e.target.value)}  placeholder='Email' value={email}/>
            <input  className='border rounded-md p-1 bg-white' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <input className='border p-1 rounded bg-blue-600 text-white px-3' type='submit' value='submit'/>
        </form>
    </div>
  )
}

export default SignUp