import React from 'react'
import Sidebar from './shared/Sidebar'
import {Outlet} from 'react-router-dom'
import SendMail from './SendMail'
const Body = () => {
  return (
    <div className='flex '>
        <Sidebar/>
        <Outlet className="z-10"/>
        <SendMail className="z-1"/>
    </div>
  )
}

export default Body;