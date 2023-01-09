import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import MainScreen from '../images/MainScreen.png'

export const About = () => {
  const a = useContext(noteContext);
  return (
    <div className='about'>
      <h1 className='aboutHeading'><strong>i<span>M</span>emo<span>B</span>ook</strong></h1>
      <div className='about-section'>
        <div>
        <p>Write you important notes and save it in your account.
        Login to your account whenever wants to access your notes. Edit your already created notes
        and delete it if you no longer needed.
        Give Title to your note and add description and you can also add a tag to give your note a category.
      </p>
        </div>
        <div className='img-container'>
          <img className='MainScreenImg' src={MainScreen}/>
        </div>
      
      </div>
    </div>
  )
}
