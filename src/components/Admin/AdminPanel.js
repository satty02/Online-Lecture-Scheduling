// in this component called the course form and instructor 

import React from 'react'
import Instructor from './Instructor';
import CourseForm from './CourseForm';
import {useUser} from '../../userData';
import AdminLogin from '../Login/AdminLogin';


function AdminPanel() {

    const {userData} = useUser();

    let user = userData;
    console.log(userData)

    // if fails to fetch user directs to login page
    if (! user) {
        return (
            <div>
                <div className='text-center text-2xl m-2 bg-slate-200 p-2'>Please login Admin</div>
                <AdminLogin/>
            </div>
        )
    }

    return (
        <>
            <h1 className='border text-center bg-gray-200 text-3xl p-2'>Welcome to Admin Panel {user}</h1><br/>
            <div className='flex flex-row justify-between  w-full'>
                <CourseForm/>
                <Instructor/>
            </div>
        </>
    )
}

export default AdminPanel
