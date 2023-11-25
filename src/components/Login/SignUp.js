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
    <div className='text-center'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col  justify-center items-center'>
            <input className='border ring-1 bg-green-300' type='text' onChange={(e)=>setAdminName(e.target.value)} className='' placeholder='name' value={adminName}/>
            <input type='email' onChange={(e)=>setEmail(e.target.value)} className='' placeholder='email' value={email}/>
            <input  className='' placeholder='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <input className='border p-1 rounded bg-blue-600 text-white px-3' type='submit' value='submit'/>
        </form>
    </div>
  )
}

export default SignUp