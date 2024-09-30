import React from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";


export default function Alert(props) {
  return (
    <div className='alert'>
        <FaRegCircleCheck/>
        <div>
            <h2>{props.message}</h2>
            <h3>{props.des}</h3>
        </div>
    </div>
  )
}
