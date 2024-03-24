
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import logo_1 from '../logo_2.png'
import NoteContext from '../contexts/notes/noteContext';
import LogoutModal from './LogoutModal';
function Navbar() {
    const { notes, searchedNotes, setSearchedNotes, currentUser } = useContext(NoteContext)
    const navi = useNavigate()
    let pathname = useLocation().pathname;
    const [serach, setSerach] = useState('')
    const profileModal = useRef()
    const handleSearch = async (x) => {
        x.preventDefault()
        navi('/view_notes')
        setSearchedNotes(searchedNotes.filter((e) => (e.title).toLowerCase().includes(serach.toLowerCase())))
    }
    const onSearch = (e) => {
        setSerach(e.target.value)
    }
    const viewProfile = () => {
        profileModal.current.style.display = 'inline-block';

    }
    useEffect(() => {
        setSearchedNotes(notes)
    }, [serach])
    return (
        <>
            <nav className="position-sticky top-0  z-2 navbar navbar-expand-lg navbar-dark bg-transparent  shadow-lg p-2  " style={{ backdropFilter: ' blur(15px)' }}>
                <div className="container-fluid">
                    <Link to='/' class="navbar-brand">
                        <img src={logo_1} alt="Notomi" width="150px" height="50" />
                    </Link>
                    <div className="collapse navbar-collapse" style={{ marginLeft: "7rem" }}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className={`nav-link py-1 px-3 ${pathname === "/" ? "  text-primary  border  border-secondary-subtle rounded-3 " : "text-dark  "}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className={`nav-link py-1 px-3 ${pathname === "/view_notes" ? " text-primary  border  border-secondary-subtle rounded-3 " : "text-dark "}`} aria-current="page" to="/view_notes">Notes</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={`nav-link py-1 px-3 ${pathname === "/about" ? " text-primary  border  border-secondary-subtle rounded-3 " : "text-dark "}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <form className='d-flex position-absolute translate-middle-x' style={{ top: "25%", left: "65%" }}>
                            <input type="text" className='form-control px-4 bg-transparent rounded-pill border-1 shadow-lg  border-secondary-subtle  ' style={{ width: "500px", height: "38px", outline: "none", backdropFilter: "blur(20px)" }} placeholder='Search Your Notes' onChange={onSearch} />
                            <button type='submit' onClick={handleSearch} className='bg-transparent border-0 fs-5' style={{ position: "relative", right: "35px" }}><IoSearch /></button>
                        </form>
                        {!localStorage.getItem('userDetail') ? <form className="d-flex" role="search">
                            <Link to='/signup' className='btn btn-primary mx-2'>SignUp</Link>
                            <Link to='/login' className='btn btn-primary'>Login</Link>
                        </form> : <button onClick={viewProfile} className='btn border-secondary' style={{backdropFilter:"blur(5px)"}}>{currentUser.user ? currentUser.user.name : 'XXXXX'}</button>}
                    </div>
                </div>
            </nav>
            {
                localStorage.getItem('userDetail') && <div style={{ display: "none" }} ref={profileModal}><LogoutModal profileModal={profileModal} /></div>
            }
        </>
    );
}

export default Navbar;
