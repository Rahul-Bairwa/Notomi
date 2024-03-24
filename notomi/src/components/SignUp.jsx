import React, { useContext, useState } from 'react'
import NoteContext from '../contexts/notes/noteContext'
import { useNavigate ,Link} from 'react-router-dom'

const SignUp = () => {
    const navi = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const { setAlertMessage, EkAlert } = useContext(NoteContext)
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        if (credentials.password === credentials.cpassword) {
            const response = await fetch('http://localhost:3300/api/auth/createUser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            const responseData = await response.json()
            console.log(responseData)
            console.log(response.status)
            if (response.status === 200) {
                EkAlert.current.style.display = "block"
                EkAlert.current.style.background = "#2DD284"
                setTimeout(() => {
                    EkAlert.current.style.display = "none"
                }, 7000)
                setAlertMessage("Thanks for signing up")
                localStorage.setItem('userDetail', JSON.stringify(responseData))
                navi('/login')
            }
            if (response.status===409) {
                EkAlert.current.style.display = "block"
                EkAlert.current.style.background = "#FF2E33"
                setTimeout(() => {
                    EkAlert.current.style.display = "none"
                }, 7000)
                setAlertMessage("This user already exists")
            }
        }
        else {

        }

    }
    console.log(credentials)
    return (
        <div className='container' style={{ height: "90vh" }}>
            <div style={{ height: "90vh", fontSize: ".9rem" }} className="d-flex flex-column justify-content-center align-items-center ">
                <h5>Sign-up</h5>
                <form onSubmit={handlesubmit} style={{ width: "450px" }} className='login-page   p-4 rounded-4 border border-2 border-secondary'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="border-secondary-subtle form-control placeholder-wave" name="name" placeholder='Please Enter name' id="name" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email " className="form-label">Email address</label>
                        <input type="email" className="border-secondary-subtle  form-control placeholder-wave " name='email' id="email" required aria-describedby="emailHelp" placeholder='Please enter email' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="border-secondary-subtle form-control placeholder-wave" name="password" minLength={5} required placeholder='Please Enter Password' id="password" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmpassword" className="form-label">confirm Password</label>
                        <input type="password" className="border-secondary-subtle form-control placeholder-wave" name="cpassword"  placeholder='Please Enter Password' id="confirmpassword" onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Term & Condition</label>
                    </div>
                    <button type="submit" className="btn btn-outline-secondary w-100 mt-4 position-relative bottom-0 start-50 translate-middle" disabled={credentials.password!==credentials.cpassword} >Submit</button>
                    <div className='text-center  w-100'> <Link className='text-decoration-none' to='/login'> if do you have an account</Link></div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
