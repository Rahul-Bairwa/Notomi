import React, { useContext } from 'react'
import './logoutmodal.css'
import { FaCircleUser,FaRegNoteSticky } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { ImCross } from "react-icons/im";
import NoteContext from '../contexts/notes/noteContext';
import { Link, useNavigate } from 'react-router-dom';
const LogoutModal = ({ profileModal }) => {
    const navigate = useNavigate()
    const { currentUser } = useContext(NoteContext)
    const closeProfile = () => {
        profileModal.current.style.display = 'none'
    }
    const handleLogout = () => {
        localStorage.removeItem('userDetail')
        navigate('/login')
    }
    return (
        <div className='logout border border-secondary rounded-3 bg-transparent position-fixed z-1 p-4  '>
            <div className="container  d-flex flex-column align-items-center justify-content-center">
                <div className='profile d-flex'><FaCircleUser /></div>
                {currentUser.user && <div><h4 className='user-name text-center p-2'>{currentUser.user.name}</h4></div>}
                <Link to='/view_notes' className='list-it text-decoration-none border border-secondary rounded-3 text-center '><FaRegNoteSticky className='mx-1'/>Your Notes</Link>
                <div className='list-it border border-secondary rounded-3 text-center text-danger 'onClick={handleLogout}> <IoMdLogOut className='mx-1'/>Logout</div>
                <div className='fs-4' style={{cursor:"pointer"}}onClick={closeProfile}><ImCross/></div>
            </div>
        </div>
    )
}

export default LogoutModal
