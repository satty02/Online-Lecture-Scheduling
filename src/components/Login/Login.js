// this components having admin login component and instructor login component

import React, {useState} from 'react'
import AdminLogin from './AdminLogin'
import InstructorLogin from './InstructorLogin';
import SignUp from './SignUp';
import logo from './assets/logoe.png'

function Login() {
    const [adminLogin, setAdminLogin] = useState(false);
    const [instructorLogin, setInstructorLogin] = useState(false);
    const [signUps, setSignUps] = useState(false);


    const handleChange = (e)=>{
        const login = e.target.value;
        if(login === 'Admin Login'){
            setAdminLogin(true);
            setInstructorLogin(false);
        }else if(login === 'Instructor Login'){
            setInstructorLogin(true);
            setAdminLogin(false);
        }else {
            setAdminLogin(false);
            setInstructorLogin(false);
        }
    }

    const handleSignUp = ()=>{
        setSignUps(!signUps)
    }

    return (
        <>
            <div className='flex flex-row w-full bg-blue-50 items-center gap-2 justify-between'>
                <img className='w-[150px] h-[50px] rounded-lg p-1 ml-5 shadow-lg' src={logo} alt='logo' />
                <div className='mr-3'>
                    <ul className='flex gap-2'>
                        <li className='text-center text-xl font-bold'>
                            <select className='flex flex-row justify-center align-middle items-center bg-black text-white rounded-md' onChange={handleChange}>
                                <option >Login</option>
                                <option className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2'>Admin Login</option>
                                <option className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2'>Instructor Login</option>
                            </select>
                        </li>
                        <li className='text-center text-lg font-bold bg-black text-white rounded-md px-2'><button onClick={handleSignUp} value={signUps}>Sign up</button></li>
                    </ul>
                </div>
               

            </div>
                <div className=''> 
                    {
                        adminLogin && <AdminLogin/>
                    }
                        {
                        instructorLogin && <InstructorLogin/>
                    } </div>

                <div className='absolute top-[10%] right-0'>
                    {signUps && <SignUp/>}
                </div>
        </>
    )
}

export default Login
