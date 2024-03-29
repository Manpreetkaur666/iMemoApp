import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext'

export const AddNote = () => {
    const contextAlert = useContext(alertContext)
    const { alert, showAlert } = contextAlert
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    })
    const onChange = (e) => {
        
        setNote({...note, [e.target.name]: e.target.value})
    }
    const handleClick = (e) => {
        e.preventDefault();
          addNote(note.title, note.description, note.tag);
          setNote({title: "", description: "", tag:""});
          showAlert("Note Added Successfully!", "success")
    }
    return (
        <div className='note-container my-5'>
            <h2>Add a Note</h2>
            <form className='note-sub-container my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
              
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;
