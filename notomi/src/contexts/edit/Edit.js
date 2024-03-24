import React, { useState } from 'react'
import editContext from './editContext'

const Edit = ({children}) => {
    const [singleNoteDetail, setSingleNoteDetail] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [editedNote, setEditedNote] = useState({ title: "", description: "", tag: "" })

    return (
        <editContext.Provider value={{showModal, setShowModal,editedNote, setEditedNote,singleNoteDetail, setSingleNoteDetail}}>
            {children}
        </editContext.Provider>
    );
}

export default Edit
