import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { CiSearch } from "react-icons/ci";
import { FaPencil } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";

import dp from "../assets/images/image.png"
import Alert from '../components/Alert';
import DeleteUser from '../components/DeleteUser';
import AddUser from '../components/AddUser';
import EditUser from '../components/EditUser';

export default function Members() {
    const [search,setSearch] = useState("")
    const [users,setUsers]=useState([])
    const [alert,setAlert]=useState("")
    const [deleteUser,setDeleteUser]=useState()
    const [addMember,setAddMember]=useState(false)
    const [editUser,setEditUser]=useState()


    const createAlert = (message,des)=>{
        setAlert({message,des})
        setTimeout(()=>{setAlert("")},2000)
    }
    const settingDeleteUser=(message)=>{
        setDeleteUser()
        createAlert(message.message,message.des)

        fetchUsers()
    }
    const closeAddMember=(message)=>{
        setAddMember(false)
        createAlert(message.message,message.des)

        fetchUsers()

    }
    const closeEdit = (message)=>{
        setEditUser()
        createAlert(message.message,message.des)
        fetchUsers()

    }
    const fetchUsers = async()=>{
        const response = await fetch('https://assessment-api-biay.onrender.com/users',{
            method:"get",
            headers:{
                "content-type":"application/json"
            }
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            setUsers(data.data)
        }
    }
    useEffect(()=>{
        fetchUsers()

    },[])
  return (
    <>
        {
             users &&

        <div>
            <div className="title">
                <h1>Team</h1>
                <div>
                    <button onClick={()=>{setAddMember(true)}}>+Add Members</button>
                    <div className="search">
                        <input type="text" value={search} onChange={e=>{setSearch(e.target.value)}} placeholder='Search'/>
                        <CiSearch></CiSearch>
                    </div>
                </div>
            </div>
            <div className="filter"></div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Edit</th>
                </tr>
                {!search && 
                users.map(ele=><tr>
                    <td><img src={ dp } alt="" /><div><h2>{ele.username}</h2><h4>{ele.email}</h4></div></td>
                    <td>{ele.department}</td>
                    <td>
                        <select value={ele.role}>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Department Head">Department Head</option>

                        </select>
                    </td>
                    <td>
                        <button onClick={()=>{setEditUser(ele._id)}}><FaPencil/></button>
                        <button onClick={()=>{setDeleteUser(ele._id)}}><CiTrash/></button>
                    </td>

                </tr>)}
                {
                    search && (users.filter(ele=>ele.username.toLowerCase()===search.toLowerCase())).map(ele=><tr>
                        <td><img src={ dp } alt="" /><div><h2>{ele.username}</h2><h4>{ele.email}</h4></div></td>
                        <td>{ele.department}</td>
                        <td>
                            <select value={ele.role}>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Department Head">Department Head</option>
    
                            </select>
                        </td>
                        <td>
                            <button onClick={()=>{setEditUser(ele._id)}}><FaPencil/></button>
                            <button onClick={()=>{setDeleteUser(ele._id)}}><CiTrash/></button>
                        </td>
    
                    </tr>
                    )
}
            </table>
        </div>
        }
        {alert && <Alert message={alert.message} des={alert.des}/>}
        {deleteUser && <DeleteUser id={deleteUser} cb={settingDeleteUser}/>}
        {addMember && <AddUser cb={closeAddMember}/>}
        {editUser && <EditUser id={editUser} cb={closeEdit}/>}


    </>
  )
}
