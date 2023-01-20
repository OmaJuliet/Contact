import { useState } from "react"
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";


const Create = () => {
  const navigate = useNavigate()

  // states to store the different values of the form fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)



  const handleSubmit = async (e) => {
    e.preventDefault()

    // to check if all the form fields have been inputted
    if (!title || !description || !rating) {
      setFormError('Please fill in all the fields.')
      return  //so that no request will be sent to supabase since form field isn't complete
    }


    // to add the inputted data as a row in the task table in supabase
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description, rating }])


    // check if there's an error and output error message
    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields.')
    }

    //check for the data. After adding the values in the form field, show the data value in the console and then go to the home page to see it.
    if (data) {
      console.log(data)
      alert('Task created')
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <>
      <section className="relative">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add a new task</h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -m-2">

                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                    <input 
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div Name="relative">
                    <label htmlFor="rating" className="leading-7 text-sm text-gray-600">Rating</label>
                    <input 
                      type="number"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>

                <div className="p-2 w-full">
                  <div className="relative">
                    <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                  </div>
                </div>

                <div className="p-2 w-full">
                  <button className="flex mx-auto text-white border-0 py-2 px-8 focus:outline-none rounded-lg text-lg">Add task</button>
                </div>

              </div>

              {/* {formError && <p className="error">{formError}</p>} */}
            </form>
            {formError && <p className="error">{formError}</p>}
          </div>
        </div>
      </section>
    </>
  )
}

export default Create