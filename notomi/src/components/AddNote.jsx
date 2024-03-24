import React, { useContext, useState } from 'react'
import NoteContext from '../contexts/notes/noteContext'
const AddNote = () => {
    const{Addnote,errors}=useContext(NoteContext)
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        // setNote({title:"",description:"",tag:""})
        Addnote(note)

    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className='container  py-4'>
            <div className="container p-4 rounded-4 border border-secondary "style={{backdropFilter:' blur(7px)'}}>
            <h2 className='text-secondary'>Add A Note</h2> 
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control border-secondary-subtle" id="title" name='title' value={note.title} onChange={onChange}/>
                    {errors.title&&<div className='text-danger'>* {errors.title}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" >Description</label>
                    <input type="text" className="form-control border-secondary-subtle" id="description" value={note.description} onChange={onChange} name='description'/>
                    {errors.description&&<div className='text-danger'>* {errors.description}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >Tag</label>
                    <input type="text" className="form-control border-secondary-subtle" id="tag" name='tag' value={note.tag} onChange={onChange}/>
                </div>
                <button disabled={note.title.length<5|| note.description.length<5} type="submit" className="btn btn-primary " onClick={handleClick}>Submit Note</button>
            </form>
        </div>
        </div>
    )
}

export default AddNote
