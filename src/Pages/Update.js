import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Update = () => {
  // invoking the useParam hook to get the id parameter
  const { id } = useParams()

  const navigate = useNavigate()

  // state to store the records we get back
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // to check if all the form fields have been inputted, so as not to send an empty form to supabase
    if (!title || !description || !category) {
      setFormError('Please fill in all the fields.')
      return
    }

    // to add the inputted data as a row in the tasks table in supabase
    const { data, error } = await supabase
      .from('tasks')

      //the update method to update the 3 fields: title, description, and rating.
      .update({ title, description, category })

      // to specify and update the particular task the user wants to update.
      .eq('id', id)


    // check if we have the error to output error message
    if (error) {
      setFormError('Please fill in all the fields.')
    }

    // if we have the data, set the error message to null and navigate user back to the home page
    if (data) {
      setFormError(null)
      navigate('/')
    }
  }


  useEffect(() => {
    const fetchTask = async () => {

      // fetching the data and the error from the supabase tasks table we created
      const { data, error } = await supabase
        .from('tasks')

        //To get/grab one particular task where the id is equal to the id parameter defined above
        .select()
        .eq('id', id)

        // to make it return a single task item from the tasks table
        .single()

      // redirect user back to home page if they go to an update page that doesn't exist and replace the route in the history with the home page
      if (error) {
        navigate('/', { replace: true })
      }

      // grab all the data from the record we get back and update each of the fields
      if (data) {
        setTitle(data.title)
        setDescription(data.description)
        setCategory(data.category)
      }
    }

    // to invoke the fetchTask function
    fetchTask()

    // to declare the id and navigate dependencies
  }, [id, navigate])




  return (
    <>
      <section className="relative">
        <div className="container px-5 py-4 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Update task</h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            {/* form to prepopulate the fields of the form with the different properties and the existing data */}
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
                  <div className="relative">
                    <label htmlFor="category" className="leading-7 text-sm text-gray-600">Category</label>
                    <input
                      type="text"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
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
                  <button className="flex mx-auto text-white border-0 py-2 px-8 focus:outline-none rounded-lg text-lg">Update task</button>
                </div>

              </div>

              {formError && <p className="error">{formError}</p>}
            </form>
          </div>
        </div>
      </section>

    </>
  )
}

export default Update