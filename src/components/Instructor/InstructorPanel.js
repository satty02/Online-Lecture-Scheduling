// In this component instructor lecture schedule is displayed after login

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useUser} from '../../userData';

function InstructorPanel() {
    const [courses, setCourses] = useState([]);
    const {userData} = useUser();

    let searchTerm = userData && userData.instructor ? userData.instructor.name : '';

    useEffect(() => {
        axios.get(`https://online-lecture-scheduling.vercel.app/admin/get-course-instr`).then((response) => {
            setCourses(response.data);
        }).catch((error) => {
            console.error('Error fetching courses:', error);
        });
    }, []);


    // Filter courses to find lectures with the instructor
    const filteredCourses = courses.filter((course) => course.lectures.some((lecture) => lecture.instructor.toLowerCase() === searchTerm.toLowerCase()));

    // Filter further to display only courses taught by user
    const AllCourses = filteredCourses.filter((course) => course.lectures.some((lecture) => lecture.instructor.toLowerCase() === searchTerm.toLowerCase()));


    return (
        <div className='flex flex-col items-center bg-blue-50'>
            <h1 className='border bg-gray-100 rounded-md text-center w-full text-4xl m-1 p-3'>Instructor Schedule Panel</h1>
            <div className='flex'>
                {
                AllCourses.length === 0 ? (
                    <p>No courses found with the given instructor name.</p>
                ) : (AllCourses.map((course) => (
                    <div className='border p-2 bg-blue-200 rounded-lg m-2 w-fit'
                        key={
                            course._id
                    }>
                        <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>Course Name: {
                            course.name
                        }</h3>
                        <p className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1 w-fit'>Course Level: {
                            course.level
                        }</p>
                        <h4 className='border rounded-md p-1 px-2 bg-blue-200-100 m-1'>Lectures:</h4>
                        <ul>
                            <div className='flex border rounded-md p-1 bg-gray-300 m-1 justify-around'>
                                <div>
                                    <p className='font-medium'>Instructor |</p>
                                </div>
                                <div>
                                    <p className='font-medium'>
                                        Date:
                                    </p>
                                </div>
                            </div>

                            {
                            course.lectures.map((lecture, index) => (lecture.instructor === searchTerm ? (
                                <li className='border rounded-md p-1 bg-gray-100 m-1'
                                    key={index}>

                                    <div className='flex justify-around'>
                                        <div>
                                            <p className='font-medium'>
                                                {
                                                lecture.instructor
                                            } </p>
                                        </div>
                                        <div>
                                            <p className='font-medium'>
                                                {
                                                lecture.date
                                            } </p>
                                        </div>
                                    </div>
                                </li>
                            ) : null))
                        } </ul>
                    </div>
                )))
            } </div>

        </div>
    )
}

export default InstructorPanel;
