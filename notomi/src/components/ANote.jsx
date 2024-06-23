import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import notes_img from '../notes_img.jpeg'
import { MdOutlineFolderDelete } from "react-icons/md";
import { LuFolderEdit } from "react-icons/lu";
import NoteContext from '../contexts/notes/noteContext';
import editContext from '../contexts/edit/editContext';

const ANote = ({ note }) => {
    const navigate = useNavigate();
    const { deleteNote } = useContext(NoteContext)
    const { setShowModal, setEditedNote,singleNoteDetail, setSingleNoteDetail} = useContext(editContext)
    const modalVisiblity = (e) => {
        setEditedNote(e)
        setShowModal(singleNoteDetail)
    }
    const handleSingleNote=()=>{
        setSingleNoteDetail({...note})
        navigate('/singlenote')
    }
    // console.log(singleNoteData)
    return (
        <>
            <div className="col-md-3 py-3" onClick={handleSingleNote}>
                <div className="card rounded-4 " style={{ width: "18rem" }}>
                    <img src={notes_img} className="card-img-top border-bottom rounded-4" alt="..." />
                    <div className="card-body " >
                        <h5 className="card-title " > {note.title}</h5>
                        <p className="card-description m-0 pb-0 overflow-scroll" style={{height:"8rem"}}>{note.description}</p>
                        <div className='d-flex justify-content-between '>
                            <div className="btn btn-outline-danger m-0 py-0 px-3 fs-5" onClick={() => deleteNote(note._id)}><MdOutlineFolderDelete /></div>
                            <div className="btn btn-outline-success m-0  py-0 px-3 fs-5" onClick={() => modalVisiblity(note)} ><LuFolderEdit /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ANote
