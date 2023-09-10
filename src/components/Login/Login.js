// this components having admin login component and instructor login component

import React, {useState} from 'react'
import AdminLogin from './AdminLogin'
import InstructorLogin from './InstructorLogin';

function Login() {
    const [adminLogin, setAdminLogin] = useState(false);
    const [instructorLogin, setInstructorLogin] = useState(false);


    const handleAdmin = () => {
        setAdminLogin(true);
        setInstructorLogin(false);
    };
    const handleInstructor = () => {
        setInstructorLogin(true);
        setAdminLogin(false);
    }

    return (
        <>
            <div className='flex flex-col w-full bg-blue-50 items-center gap-2'>
                <div className=' content-center items-center text-2xl bg-slate-300 p-2 m-5 rounded-lg'>Online Lecture Scheduling Model</div>
                <div className='flex flex-row justify-center align-middle items-center'>
                    <button className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2'
                        onClick={handleAdmin}>Admin Login</button>
                    <button className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2'
                        onClick={handleInstructor}>Instructor Login</button>
                </div>
                <div> {
                    adminLogin && <AdminLogin/>
                }
                    {
                    instructorLogin && <InstructorLogin/>
                } </div>

            </div>


        </>
    )
}

export default Login
