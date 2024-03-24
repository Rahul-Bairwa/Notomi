import React, { useContext } from 'react'
import NoteContext from '../contexts/notes/noteContext'

const Alert = () => {
    const{EkAlert,alertMessage}=useContext(NoteContext)
    return (
        <div className="alert  alert-info text-light position-sticky  z-3"  style={{display:"none",top:"70px"}} ref={EkAlert} role="alert">
            {alertMessage}
        </div>
    )
}

export default Alert
