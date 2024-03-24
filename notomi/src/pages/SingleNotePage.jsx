import React, { useContext } from 'react'
import editContext from '../contexts/edit/editContext'

const SingleNotePage = () => {
    const{singleNoteDetail,setSingleNoteDetail}=useContext(editContext)
    console.log(singleNoteDetail)
  return (
    <section className='container'>
      <textarea className='outline-0 border-none bg-transparent p-5' onChange={(e)=>setSingleNoteDetail(e.target.value)} value={singleNoteDetail} style={{width:"100%",height:"calc(100vh - 83px)"}} name="" ></textarea>
    </section>
  )
}

export default SingleNotePage