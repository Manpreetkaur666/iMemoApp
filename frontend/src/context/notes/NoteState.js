import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    // const host = "http://localhost:5000/"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    
    // ROUTE1: FetchAll notes using GET request
    const fetchAllNotes = async() => {
        const url = `/notes/fetchnotes`
        // const url = `${host}api/v1/notes/fetchnotes`
        const response = await fetch(url, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json()
      console.log(json);
      setNotes(json);
    }

    // ROUTE2: Add note using POST request
    const addNote = async(title, description, tag) => {
        const url = `/notes/addnote`
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) 
          });
        const note = await response.json()
       setNotes(notes.concat(note))
    }

    // ROUTE3: Delete note using DELETE request
    const deleteNote = async(id) => {
        const url = `/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          });
        //   const json = await response.json();
        console.log("dele note with id" + id)
         setNotes((prevState) =>
          prevState.filter((note) => note._id !== id)
        );
    }

    // ROUTE4: Edit note using PUT request
    const editNote = async(id, title, description, tag) => {      
        const url = `/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const json = await response.json();
          console.log(json);

          let newNotes = JSON.parse(JSON.stringify(notes));
        //   const json = response.json();
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
              newNotes[index].title =  title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            } 
        }
        setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchAllNotes}}>
              {props.children}
        </NoteContext.Provider>)
}

export default NoteState;