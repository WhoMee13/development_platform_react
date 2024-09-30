import React, { useEffect, useState } from 'react'

export default function AddUser({cb}) {
    const [username,setUsername] = useState()
    const [profile,setProfile] = useState()
    const [department,setDepartment] = useState()
    const [email,setEmail] = useState()

    const handleAdd=async()=>{
        const response  = await fetch("https://assessment-api-biay.onrender.com/users",{
            method:"post",
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify({
                username:username,
                email:email,
                department:department,
                photo:String(profile),
                role:"Employee"
            })
        })
        const data=await response.json()
        console.log(data)
        if(data.success){   
        cb({message:"Member was Added",des:`Member ${data.data.username} was added`})
            
        }
    }
  return (
    <div className='popup'>
 
        <div className='title'>
            <span>Add User</span>
            <span onClick={()=>{cb({message:"",des:""})}}>X</span>

            <div>
                <input type='text' placeholder='Name' value={username} onChange={e=>{setUsername(e.target.value)}} ></input>
            </div>
            <div className='editable'>
                <span>Profie Picture</span>
                <input type="file" name="photo" onChange={e=>setProfile(e.target.files[0])}/>
            </div>
            <div className='editable'>
                <span>email</span>
                <input type="text" placeholder='examplemail' value={email} onChange={e=>{setEmail(e.target.value)}}/>
            </div>
            <div className='editable'>
                <span>Department</span>
                <label>
                    Finance
                <input type="radio" name='department' value="Finance" onChange={e=>{setDepartment(e.target.value)}} ></input>


                </label>
                <label>
                    R&D
                <input type="radio" name='department' value="R&D" onChange={e=>{setDepartment(e.target.value)}}></input>
                    

                </label>
                <label>
                    IT
                <input type="radio" name='department' value="IT" onChange={e=>{setDepartment(e.target.value)}}></input>

                </label>
                <label>
                    Operations
                <input type="radio" name='department' value="Operations"onChange={e=>{setDepartment(e.target.value)}}></input>

                </label>
                <label>
                    Marketing
                <input type="radio" name='department' value="Marketing" onChange={e=>{setDepartment(e.target.value)}}></input>
                </label>
            </div>
            <button onClick={handleAdd}>Add</button>
            
        </div>
    </div>
  )
}
