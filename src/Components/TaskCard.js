import React, { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient";
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
// import LoadingState from './LoadingState';
import NoContacts from './NoContacts';


const reactimages = "https://tqfruvglcoupvuwfhpzo.supabase.co/storage/v1/object/public/images"


const TaskCard = ({ props, task, onDelete }) => {

    // const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsEmpty(true);
        }, 1000);
    }, []);


    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', task.id)

        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
            onDelete(task.id)
        }
        window.location.reload();
    }

    return (
        <>
            <section className="">
                {/* {!isEmpty && <NoContacts />} */}
                {isEmpty ? <NoContacts /> : 
                <div className="p-4 lg:w-full w-full">
                    <div className="h-full border-2 bg-gray-300 rounded-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex flex-wrap">
                                <img src={`${reactimages}/${task.fileUrl}`} className="w-12 h-12 rounded-full" alt="user" />
                                <h1 className="text-xl font-semibold text-gray-900 mt-3 ml-3">{task.name}</h1>
                            </div>
                            <div className="mt-6">
                                <p className="leading-relaxed mb-1">Email: {task.email}</p>
                                <p className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Phone Number: {task.number}</p>
                            </div>
                            <div className="flex items-center flex-wrap mt-2">
                                <span className="mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 bg-gray-500 rounded-full p-4">
                                    <Link to={"/" + task.id}>
                                        <FaEdit className="w-4 h-4" />
                                    </Link>
                                </span>
                                <span className="inline-flex items-center leading-none text-sm bg-gray-500 rounded-full p-2 cursor-pointer">
                                    <FaTrash className="w-4 h-4" onClick={handleDelete} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                }
            {/* } */}
            </section>

        </>
    )
}

export default TaskCard