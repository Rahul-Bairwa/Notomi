import React, { useContext } from 'react'
import NoteContext from '../contexts/notes/noteContext'
import ANote from './ANote'
import '../modal.css'
import editContext from '../contexts/edit/editContext'
import { RxCross2 } from "react-icons/rx";
import { useEffect } from 'react'
const Notes = () => {
    
    const { searchedNotes,editNote,errors,setErrors,notes } = useContext(NoteContext)
    const { setShowModal, showModal, editedNote, setEditedNote } = useContext(editContext)
    const handleEdit = (e) => {
        e.preventDefault();
        if(Object.keys(errors).length===0){
            setShowModal(false)
        }
        editNote(editedNote)
    }
    const onChange = (e) => {
        e.preventDefault()
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
    }
    const closeModal=()=>{
        setShowModal(false)
        setErrors({})
    }
    
    return (
        <div >
            {
                showModal === true &&
                <div className='modal-wapper container' >
                    <div className='back-button rounded-circle border border-secondary-subtle'onClick={closeModal}><RxCross2 /></div>
                    <form style={{backgroundColor:"#ECFCFF"}} className='modal-container  p-4 border border-secondary'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control  border border-secondary-subtle" id="title" name='title' value={editedNote.title} onChange={onChange} />
                            {errors.title&&<div className='text-danger'>* {errors.title}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label" >Description</label>
                            <input type="text" className="form-control  border border-secondary-subtle" id="description" onChange={onChange} name='description' value={editedNote.description} />
                            {errors.description&&<div className='text-danger'>* {errors.description}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label" >Tag</label>
                            <input type="text" className="form-control  border border-secondary-subtle" id="tag" onChange={onChange} name='tag' value={editedNote.tag} />
                        </div>
                        <button type="submit " className="submit-button btn btn-outline-success position-relative bottom-0 start-50 translate-middle-x" onClick={handleEdit}>Submit</button>
                    </form>
                </div>
            }
            {showModal === false && <div className="container ">
                {searchedNotes.length===0&&<div className="d-flex justify-content-center align-items-center text-center" style={{minHeight:"calc(100vh - 120px)"}}>
                    <h1 className='fw-bold lh-base' style={{fontSize:"8rem"}}>{notes.length===0?'Please Add Your Note':"Sorry you haven't added this note yet"}</h1>
                </div>}
                {searchedNotes.length!==0&&<div className="row ">
                    {
                        searchedNotes.map((e) => {
                            return <ANote key={e._id} note={e} />
                        })
                    }
                </div>}
            </div>}
        </div>
    )
}

export default Notes
