import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import NoteState from './contexts/notes/NoteState';
import Alert from './components/Alert';
import Edit from './contexts/edit/Edit';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Notes from './components/Notes';
import SingleNotePage from './pages/SingleNotePage';
function App() {
  return (
    <div className='home-page '>
      <NoteState>
        <Navbar />
        <Alert />
        <div>
          <Edit>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/view_notes' element={<Notes />} />
              <Route path='/singlenote' element={<SingleNotePage />} />
            </Routes>
          </Edit>
        </div>
      </NoteState>
    </div>
  )
}

export default App
