import React from 'react'
import notes from '../notes.png'
import home from '../home.png'
import signup from '../signup.png'
import { Link } from 'react-router-dom'
const About = () => {
    return (
        <div class="container p-4 text-center" style={{ height: "87vh" }}>
            <div class="row">
                <div class="col-sm-12 fw-bolder"><div className='' style={{ fontSize: "5rem", color: "#24B87A" }}>About Us</div></div>
            </div>
            <div class="row">
                <div class="col-sm-12 mt-5">
                    <div style={{ letterSpacing: "1px", wordSpacing: "5px" }}>
                        <p className='fw-medium fs-1 m-3 text-dark'>We Provide A Platform</p>
                        <p className='fw-medium fs-1 mb-5 text-dark'>Where You Can Secure Your Notes</p>
                    </div>
                </div>
            </div>
            <div class="row" style={{ height: "50%" }}>
                <div class="col-sm-4 p-3">
                    <div className='border border-secondary  p-3  rounded-3 '><Link to='/signup'><img className='w-100 border border-secondary-subtle rounded-3' src={signup} alt="" /></Link></div>
                </div>
                <div class="col-sm-4 p-3">
                    <div className='border border-secondary  p-3  rounded-3'><Link to='/'><img className='border border-secondary-subtle w-100 rounded-3' src={home} alt="" /></Link></div>
                </div>
                <div class="col-sm-4 p-3">
                    <div className='border border-secondary  p-3  rounded-3'><Link to='/view_notes'><img className='border border-secondary-subtle w-100 rounded-3' src={notes} alt="" /></Link></div>
                </div>
            </div>
        </div>
    )
}

export default About
