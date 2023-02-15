import React from "react";
import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import TaskCard from "../Components/TaskCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [tasks, setTasks] = useState(null);


  const handleDelete = (id) => {
    setTasks(prevTasks => {
      return prevTasks.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select();

      if (error) {
        setFetchError("Could not fetch tasks");
        setTasks(null);
        console.log(error);
      }

      if (data) {
        setTasks(data);
        setFetchError(null);
      }
    };

    fetchTasks();
  }, []);
  return (
    <>
      <div className="container px-5 py-8 mx-auto">
        {fetchError && <p>{fetchError}</p>}
        {tasks && (
          <div className="lg:grid lg:gap-4 lg:grid-cols-3 lg:grid-rows-3 grid -m-4 md:grid md:gap-3 md:grid-cols-2 md:grid-rows-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))}
          </div>
        )} 
      </div>

    </>
  );
};

export default Home;
