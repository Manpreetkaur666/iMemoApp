import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export const About = () => {
  const a = useContext(noteContext);
  return (
    <div className='about'>
      <h1>iMemobook</h1>
      <div className='about-section'>
        <div>
        <p>Write you important notes and save it in your account and log in to your account
        Login to your account whenever wants to access your notes. Edit your already created notes
        and delete it if you no longer needed.
        Give Title to your note and add description and you can also add a tag to give your note a category.
      </p>
        </div>
        <div>
          <img src='/src/images/MainScreen.png'/>
          
        </div>
      
      </div>
    </div>
  )
}
