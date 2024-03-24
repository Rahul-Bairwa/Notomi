import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../contexts/notes/noteContext'
const Login = () => {
    const navi = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const { setAlertMessage, EkAlert,getData } = useContext(NoteContext)
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handlesubmit = async () => {
        const response = await fetch('http://localhost:3300/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        const responseData = await response.json()
        if (response.status === 200) {
            EkAlert.current.style.display = "block"
            EkAlert.current.style.background = "#2DD284"
            setTimeout(() => {
                EkAlert.current.style.display = "none"
            }, 7000)
            setAlertMessage("Login Successfully")
            localStorage.setItem('userDetail', JSON.stringify(responseData))
            navi('/')
            getData()
        }
        if (response.status === 401) {
            EkAlert.current.style.display = "block"
            EkAlert.current.style.background = "#FF2E33"
            setTimeout(() => {
                EkAlert.current.style.display = "none"
            }, 7000)
            setAlertMessage("Please try to login with correct credentials")
        }
    }
    return (
        <div className='container' style={{ height: "90vh" }}>
            <div style={{ height: "90vh", fontSize: ".9rem" }} className="d-flex justify-content-center align-items-center ">
                <form className='login-page w-25  p-4 rounded-4 border border-secondary'>
                    <div className="mb-3">
                        <label htmlFor="email " className="form-label">Email address</label>
                        <input type="email" className="border-secondary-subtle  form-control placeholder-wave " name='email' id="email" aria-describedby="emailHelp" placeholder='Please enter email' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="border-secondary-subtle form-control placeholder-wave" name="password" placeholder='Please Enter Password' id="password" onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Term & Condition</label>
                    </div>
                    <button type="button" className="btn btn-outline-secondary w-100 mt-4 position-relative bottom-0 start-50 translate-middle" onClick={handlesubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
