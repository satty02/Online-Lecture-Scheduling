// In this component Course form is created and courselist component is called

import React, {useState} from 'react';
import CourseList from './CourseList';
import axios from 'axios';

function CourseForm() {
    const [showForms, setShowForms] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [courseData, setCourseData] = useState({name: '', level: '', description: '', image: ''});

    const handleInputChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        let file = e.target.files[0];
        let url = URL.createObjectURL(file)
        if (file) {
            setCourseData({
                ...courseData,
                image: url
            })
        } else {
            setCourseData({
                ...courseData,
                image: ''
            })
        }


    }

    const handleClick = () => {
        setMessage('')
        setShowForms(!showForms);
    };


    // posting the form data on click of create button;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('')
        setErrorMessage('')

        const formData = await courseData;

        try {
            const response = await axios.post('http://localhost:5000/admin/add-course', formData);
            console.log(response.data)

            let responeName = response.data.name
            if (response.status === 200) {
                setMessage(`Successfully added ${responeName}`);
            }

        } catch (error) {
            console.error(error);
            let err = error.response.data.message;
            setErrorMessage(err);
        }

        setCourseData({name: '', level: '', description: '', image: ''});

    }


    return (
        <>
            <div className='flex flex-col w-fit ml-2'>

                <div>
                    <button className='text-center font-medium text-lg p-2 bg-slate-200 mr-1 mb-1 mt-0 rounded-lg w-[250px]'
                        onClick={handleClick}>Add Course
                        <p className='text-xs'>(click here to add)</p>
                    </button>
                </div>

                {/* Logic for on clicking the add Course button shows the form */}

                {
                showForms && <form encType="multipart/form-data" className='flex flex-col w-[250px] bg-gray-100 rounded-md gap-1 mt-2 border p-3'
                    onSubmit={handleSubmit}>
                    <label className='text-sm mb-0'>Name</label>
                    <input type='text' className='ring-1 p-1 rounded-md' placeholder='Name'
                        onChange={handleInputChange}
                        name='name'
                        value={
                            courseData.name
                        }
                        required/>
                    <label>level</label>
                    <select className='ring-1 p-1 rounded-md'
                        onChange={handleInputChange}
                        name='level'
                        value={
                            courseData.level
                        }
                        required>
                        <option>select levels</option>
                        <option>All Levels</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Expert</option>
                    </select>
                    <label>Description</label>
                    <textarea className='ring-1 p-1 rounded-md' name='description' placeholder='Description'
                        onChange={handleInputChange}
                        value={
                            courseData.description
                        }
                        required/>
                    <input type='file' name='image'
                        onChange={handleImageChange}
                        required/>

                    <button type='submit' className='bg-blue-600 p-2 rounded-lg'>Create</button>
                </form>
            }
                <p className={
                    `text-center ${
                        errorMessage ? 'text-red-600' : '' || message ? 'text-green-600' : ''
                    }`
                }>
                    {
                    message ? message : null || errorMessage ? errorMessage : null
                }</p>

            </div>

            {/* Showing the created course */}

            <div> {
                < CourseList />
            } </div>
        </>
    )
}

export default CourseForm;
