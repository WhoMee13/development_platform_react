import React, { useEffect, useState } from 'react'

export default function DeleteUser({id,cb}) {
    const [user,setUser]=useState()
    const fetchUser = async()=>{
        const response = await fetch(`https://assessment-api-biay.onrender.com/users/${id}`,{
            method:"get",
            headers:{
                "content-type":"application/json"
            } 
        })
        const data = await response.json()
        if(data.success){
            setUser(data.data)
        }
    }
    const handleClose = ()=>{
        setUser("")
        cb({message:"",des:""})
    }
   const handleRemove =async()=>{
        const response = await fetch(`https://assessment-api-biay.onrender.com/users/${id}`,{
            method:"delete",
             headers:{
                "content-type":"application/json"
            }
        })
        const data = await response.json()
        if(data.success){
            console.log("user deleted")
        }
        cb({message:"Member was Delete",des:`Member ${user.username} was deleted`})
        
    }
    useEffect(()=>{
        fetchUser()
    },[])
  return (
    <>
    {
        user &&
        <div className='delete'>
            <div>

            <h3>Remove Member</h3>
            <div onClick={handleClose}>X</div>
            </div>
            <p>Are you sure about Removing member {user.username} currently on {user.department}</p>
            <div>
                <button onClick={handleClose}>Abort</button>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    }
    </>
    

  )
}
