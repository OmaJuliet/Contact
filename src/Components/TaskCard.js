import React from 'react';
import supabase from "../config/supabaseClient";
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';


const TaskCard = ({ task, onDelete }) => {


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
    }


    return (
        <>
            {/* <div className="smoothie-card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="rating">{task.rating}</div>
                <div className="buttons"> */}

            {/* to direct user to the edit page of the particular task they want to update. */}

            {/* <Link to={"/" + task.id}>
                        <i className="material-icons">edit</i>
                    </Link>
                    <i className="material-icons">delete</i>
                </div>
            </div> */}



            <section className="">
                {/* <div className="container px-5 py-24 mx-auto">*/}
                {/* <div className="grid -m-4">  */}
                <div className="p-4 lg:w-full w-full">
                    <div className="h-full border-2 bg-gray-300 rounded-lg border-gray-200 border-opacity-60 overflow-hidden">
                        <div className="p-6">
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{task.title}</h1>
                            <p className="leading-relaxed mb-3">{task.description}</p>
                            <div className="flex items-center flex-wrap mt-4">
                                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">{task.rating}
                                </a>
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

                {/* </div> */}
                {/*  </div> */}
            </section>
        </>
    )
}

export default TaskCard