// this component shows the list of created course also can delete the courses;

import React, {useEffect, useState} from 'react'
import Lectures from './Lectures'
import axios from 'axios'

function CourseList() {

    const [addLecture, setAddLecture] = useState(false);
    const [listOfCourse, setListofCourse] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [message, setMessage] = useState('')


    // fetch the added courses
    const getCourse = async () => {
        const response = await axios.get('https://online-lecture-scheduling.vercel.app/admin/get-all-course');
        setListofCourse(response.data);
    };


    const handleClick = async (courseId) => {
        setMessage('')
        setCourseId(courseId)
        setAddLecture(!addLecture);
    };

    // delete the selected course
    const handleDelete = async (e) => {
        setMessage('')
        e.preventDefault();
        const deleteCourse = await listOfCourse[e.target.value];
        try {
            const response = await axios.delete(`https://online-lecture-scheduling.vercel.app/admin/delete-course`, {
                data: JSON.stringify(deleteCourse),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCourse()
    }, [listOfCourse]);

    return (
        <>
            <div className='flex  content-center justify-evenly'>
                <div className='flex flex-col'>
                    <h2 className='text-center font-medium text-lg p-2 bg-slate-200 mx-1 mb-1 mt-0 rounded-lg'>All Courses</h2>
                    <p className='text-center text-sm text-red-600'>
                        {
                        message ? message : null
                    }</p>
                    <ul className='flex ml-2 flex-wrap w-[445px]'>

                        {
                        listOfCourse.map((course, index) => (
                            <>
                                <div key={index}
                                    className='border bg-gray-200 rounded-lg m-2 p-4'>
                                    <div className='flex justify-center'><img className='w-[80px] h-[80px]'
                                            src={
                                                course.image
                                            }
                                            alt='course-img'/></div>
                                    <p className='bg-gray-100 p-1 px-2 rounded-md m-1 mt-10 font-medium text-base'>Name: {
                                        course.name
                                    }</p>
                                    <p className='bg-gray-100 p-1 px-2 rounded-md m-1 font-medium text-base'>level: {
                                        course.level
                                    }</p>
                                    <p className='bg-gray-100 p-1 px-2 rounded-md m-1 font-medium text-base'>
                                        Description: {
                                        course.description
                                    }</p>
                                    <button className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2 text-sm'
                                        onClick={
                                            () => handleClick(course)
                                        }
                                        key={index}
                                        value={index}>Add Lectures</button>
                                    <button className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2 text-sm'
                                        onClick={handleDelete}
                                        value={index}>Delete</button>
                                </div>

                            </>


                        ))
                    } </ul>
                </div>


                <div className=''>
                    <h2 className='text-center font-medium text-lg p-2 bg-slate-200 w-[330px] mr-1 mb-1 mt-0 rounded-lg'>Schedule Lecture</h2>
                    {
                    addLecture && listOfCourse.length ? <Lectures courseId={courseId}/> : null
                } </div>
            </div>
        </>
    )
}

export default CourseList;
