import React, { useEffect, useState } from 'react'

export default function EditUser({id,cb}) {
    const [user,setUser]=useState()
    const [profile,setProfile]=useState()
    const [department,setDepartment]=useState()
    const update = async()=>{
        const response = await fetch(`https://assessment-api-biay.onrender.com/users/${id}`,{
            method:"put",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                username:user.username,
                profile:profile || user.profile,
                department:department || user.department,
                email:user.email,
                role:role || user.role

            })
        })
        const data=await response.json()
        console.log(data)
        if(data.success){

            cb({message:"Member was Updated",des:`Member ${user.username} was edited`})
        }
    }
    const fetchUser = async()=>{
        const response = await fetch(`https://assessment-api-biay.onrender.com/users/${id}`,{
            method:"get",
            headers:{
                "content-type":"application/json"
            }
        })
        const data=await response.json()
        if(data.success){
            setUser(data.data)
        }
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
    const [role,setRole]=useState("Department Head")
  return (
    <div className='popup'>
        {
            user && 
        <div className='title'>
            <span>Edit User</span>
            <span onClick={()=>{cb({message:"",des:""})}}>X</span>

            <div>
                <h1>{user.username}</h1>
            </div>
            <div className='editable'>
                <span>Profie Picture</span>
                <input type="file" name="photo" onChange={e=>{setProfile(e.target.files[0])}}/>
            </div>
            <div className='editable'>
                <span>Department</span>
                <label>
                    Finance
                <input type="radio" name='department' value="Finance" onChange={e=>{setDepartment(e.target.value)}}></input>


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
                <input type="radio" name='department' value="Marketing"onChange={e=>{setDepartment(e.target.value)}}></input>
                </label>
            </div>
            <div className='editable'>
                <span>Role</span>
                <select value={role} onChange={e=>{setRole(e.target.value)}}>
                            <option value="Department Head">Department Head</option>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>

                        </select>
            </div>
            <div className='editable'>
                <span>Remove Member</span>
                <input type="button" placeholder="Remove" onClick={handleRemove}/>
            </div>

            <button onClick={update}>Save</button>
            
        </div>
        }
    </div>
  )
}
