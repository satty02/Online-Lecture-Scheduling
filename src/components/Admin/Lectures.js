// this component shows the user can select instructor with date display the added lecture
import axios from 'axios';
import React, {useState } from 'react'

function Lectures({courseId}) {
    const [instructor , setInstructor] = useState('');
    const [date, setDate] = useState(null);
    const [lectureData , setLectureData] = useState([]);
    const listOfInstructor = ["karan" , "jitu","sneha" , "jagdish", "chetan"];
    const [errorMessage , setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleSelect = (e)=>{
        setInstructor(e.target.value)
    }

    const handleDate = (e)=>{
        setDate(e.target.value);
    }

    const handleData =  async(e)=>{
        setSuccessMessage('')
        setErrorMessage('');
        e.preventDefault();
        if(!instructor || !date){
            console.error('Instructor and date are required')
        }
        try {
            const newLecture = {
              course_id: courseId._id,
              instructor: instructor,
              date: date,
            };

            console.log(newLecture)
      
            const response = await axios.post(
              'http://localhost:5000/admin/assign-lecture',
              newLecture
            );
            
            setSuccessMessage(`Lecture is added to ${instructor} , click refresh to look`);

            console.log(response.data);
      
            setInstructor('');
            setDate('');
          } catch (error) {
            console.error(error.response.data);
            setErrorMessage(error.response.data.message);
          }
        
    };

    const handleSchedule = async(e)=>{
      setSuccessMessage('');
      setErrorMessage('');
      const courseId = e.target.value
      try {
        // Make a GET request to retrieve the course by ID
        const response = await axios.get(`http://localhost:5000/admin/get-course/${courseId}`);
        if(response.data.lectures){
          setLectureData(response.data.lectures);
        }else{
          setLectureData([{instructor:'No Lecture found'}])
        }
      } catch (error) {
        console.error(error);
      }
      }  
    return (
    <div className=' w-[330px]'>
            <div>
              <h2 className='border rounded-md bg-slate-50 p-1 font-medium m-1'>Course Name     : {courseId.name} </h2>
              <h2 className='border rounded-md bg-slate-50 p-1 font-medium m-1'>Course level    : {courseId.level} </h2>
            </div>
        <div className='m-1'>
            <select className='border p-1 font-medium text-sm bg-slate-50 rounded-md' onChange={handleSelect} value={instructor}>
                <option > Select</option>
                {listOfInstructor.map((name)=><option>{name}</option>)}
                </select>
            <input className='border m-1 rounded-md bg-slate-50 p-1  w-[115px] text-sm font-medium' type='date' onChange={handleDate} value={date}/>
            <button className='bg-blue-500 p-1 px-2 rounded-md m-1 font-medium text-sm' onClick={handleData} value={courseId._id}>Add</button>
            <button className='bg-blue-500 p-1 px-2 rounded-md m-1 font-medium text-sm' onClick={handleSchedule} value={courseId._id}>refresh</button>
        </div>
        <div className={`h-[18px] text-center mt-[-10px] text-xs  ${errorMessage ?'text-red-600':'' || successMessage?'text-green-600':''}`}>{errorMessage ?errorMessage:null || successMessage?successMessage:null}</div>
        <ul>
            {lectureData.map((data ,index)=><li className='bg-slate-200 m-1 px-2 p-1 rounded-md' key={index}>{data.instructor} : {data.date}</li>)}
        </ul>
        
    </div>
    
  )
}

export default Lectures