import React from 'react';


const Navbar = () => {
    return (
        <>
            <header className="">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="text-2xl">Tasky</span>
                    </a>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <a href="/" className="mr-5">Home</a>
                        <a href="/create" className="mr-5">Create</a>
                    </nav>
                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
                    </button>
                </div>
            </header>
        </>
    )
}

export default Navbar