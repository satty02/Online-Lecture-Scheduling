// This component shows the list of instructors

import React, {useState} from 'react'

function Instructor() {
    const [showList, setShowList] = useState(false);

    const listOfInstructor = [
        "karan",
        "jitu",
        "sneha",
        "jagdish",
        "chetan"
    ]

    const handleClick = () => {
        setShowList(!showList);
    }

    return (
        <div className='mr-2'>
            <button className='text-center font-medium text-lg p-2 bg-slate-200 mr-1 mb-1 mt-0 w-[135px] rounded-lg'
                onClick={handleClick}>Instructors
                <p className='text-xs'>(click here to view)</p>
            </button>
            {
            showList && <ul> {
                listOfInstructor.map((name) => <li className='border font-bold w-full px-10 py-2 bg-gray-200 rounded-lg my-1'>
                    {name}</li>)
            } </ul>
        } </div>
    )
}

export default Instructor
