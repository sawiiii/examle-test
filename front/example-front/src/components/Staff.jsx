import React from 'react'
import Sidebar from './Sidebar'

const Staff = () => {
  return (
    <>
        <Sidebar />
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="sticky z-10 top-0 h-16 border-b border-neutral-200 bg-white lg:py-2.5">
              <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                  <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Staff</h5>
              </div>
          </div>
        </div>
    </>
  )
}

export default Staff