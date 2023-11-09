import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import { Noteitem } from './Noteitem';
import alertContext from '../context/alert/alertContext'
import {useNavigate} from 'react-router-dom'

export const Notes = () => {
  let navigate = useNavigate()
  const context = useContext(noteContext);
  const contextAlert = useContext(alertContext)
  const { showAlert } = contextAlert
  const { notes, fetchAllNotes, editNote } = context;
  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: ""
})
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchAllNotes()
    } else {
      navigate('/login');
    }
  },[])
  const ref = useRef(null)

  const updateNote = (currentNote) => {
    // toggele() is function for bootstrap to show modal
    ref.current.click();
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag})
  }
  
  const onChange = (e) => { 
    setNote({...note, [e.target.name]: e.target.value})
}
    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        showAlert("Edit Successfully!", "Success:");
    }
  return (
    <div>
      <AddNote />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='comtainer my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div> 
      <div className='note-list-container row my-3'>
        <h2>Your's Notes</h2>
        <div className='container mx-3'>{notes.length === 0 && "No notes to display!"}</div>
       {notes.map((note) => {return <Noteitem key={note._id} updateNote={updateNote} note={note} /> })}
      </div>
    </div>
  )
}
