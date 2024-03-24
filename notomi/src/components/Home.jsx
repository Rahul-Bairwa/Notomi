import React, { useContext } from 'react'
import Notes from './Notes'
import AddNote from './AddNote'
import editContext from '../contexts/edit/editContext'
import LogoutModal from './LogoutModal'
const Home = () => {
    const { showModal } = useContext(editContext)
    return (
        <div style={{height:"calc(100vh - 90px)"}} className='d-flex align-items-center'>
            {showModal === false && <AddNote />}
        </div>
    )
}

export default Home
