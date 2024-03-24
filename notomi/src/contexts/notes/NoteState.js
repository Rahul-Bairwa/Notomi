import { useEffect, useRef, useState } from 'react'
import NoteContext from './noteContext'
import { useNavigate } from 'react-router-dom'
const NoteState = ({ children }) => {
    const EkAlert = useRef()
    const [alertMessage, setAlertMessage] = useState('')
    const [errors, setErrors] = useState({})
    const host = 'http://localhost:3300/api/'
    const [notes, setNotes] = useState([])
    const [searchedNotes, setSearchedNotes] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const navi = useNavigate()
    // Add a note
    const getData = async () => {
        const respose = await fetch(`${host}notes/getAllNotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": (JSON.parse(localStorage.getItem('userDetail'))).authToken
            }
        })
        const data =await respose.json()
        setNotes(data)
        setSearchedNotes(data)
    }

    const Addnote = async (note) => {
        const response = await fetch(`${host}notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": (JSON.parse(localStorage.getItem('userDetail'))).authToken
            },
            body: JSON.stringify(note)
        })
        if (response.status === 200) {
            setErrors({})
            EkAlert.current.style.display = "block"
            EkAlert.current.style.background = "#2DD284"
            setTimeout(() => {
                EkAlert.current.style.display = "none"
            }, 7000)

            setAlertMessage("Your Note Added Successfully")
            getData()
        }
        const responseData = await response.json()
        if (response.status === 400) {
            if (responseData.errors.length === 1) {
                if (responseData.errors[0].path === "title") {
                    setErrors({
                        "title": responseData.errors[0].msg
                    })
                }
                else if (responseData.errors[0].path === "description") {
                    setErrors({
                        "description": responseData.errors[0].msg
                    })
                }
            }
            else {
                setErrors({
                    "title": responseData.errors[0].msg,
                    "description": responseData.errors[1].msg
                })
            }
        }

    }

    //Delete notes
    const deleteNote = async (id) => {
        const response = await fetch(`${host}notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": (JSON.parse(localStorage.getItem('userDetail'))).authToken
            }
        })
        if (response.status === 200) {
            EkAlert.current.style.display = "block"
            EkAlert.current.style.backgroundColor = "#FF2E33"
            setTimeout(() => {
                EkAlert.current.style.display = "none"
            }, 7000)
            setAlertMessage("Your Note Deleted Successfully")
            getData()
        }
    }

    //Edit a note
    const editNote = async (e) => {
        const response = await fetch(`${host}notes/updatenote/${e._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": (JSON.parse(localStorage.getItem('userDetail'))).authToken
            },
            body: JSON.stringify(e)
        })
        if (response.status === 200) {
            setErrors({})
            EkAlert.current.style.display = "block"
            EkAlert.current.style.backgroundColor = "#2DD284"
            setTimeout(() => {
                EkAlert.current.style.display = "none"
            }, 7000)

            setAlertMessage("Your Note Updated Successfully")
            getData()
        }
        const responseData = await response.json()
        if (response.status === 400) {
            if (responseData.errors.length === 1) {
                if (responseData.errors[0].path === "title") {
                    setErrors({
                        "title": responseData.errors[0].msg
                    })
                }
                else if (responseData.errors[0].path === "description") {
                    setErrors({
                        "description": responseData.errors[0].msg
                    })
                }
            }
            else {
                setErrors({
                    "title": responseData.errors[0].msg,
                    "description": responseData.errors[1].msg
                })
            }
        }
    }
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('userDetail'))) {
            navi('/login')
        }
        else {
            getData()
            setCurrentUser(JSON.parse(localStorage.getItem('userDetail')))
        }
    }, [])
    return (
        <NoteContext.Provider value={{ notes, getData, setNotes, Addnote, deleteNote, editNote, EkAlert, alertMessage, setAlertMessage, errors, setErrors, searchedNotes, setSearchedNotes, currentUser }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState