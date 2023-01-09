import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext'

export const Noteitem = (props) => {
    const contextAlert = useContext(alertContext)
    const { alert, showAlert } = contextAlert
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;
    const { note, updateNote } = props

    // const onDelete = (e) => {
    //     e.preventDefault();
    //     deleteNote(note._id);
    //   };

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id);showAlert("Deleted Successfully!", "Success:");}}></i>
                </div>
            </div>  
        </div>
    )
}
