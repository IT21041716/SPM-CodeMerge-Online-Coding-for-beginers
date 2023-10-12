import React, { useState, useEffect } from 'react'
import logo from '../assets/IT21041716/logo2.png'
import { useDispatch, useSelector } from 'react-redux'
import { Signup } from '../actions/authAction'
import { toast } from 'react-hot-toast'

const register = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');



    useEffect(() => {
        if (loading === true) {
            toast.loading("Cheking...", {
                id: 'cheking'
            })
        }
        else if (loading === false) {
            toast.dismiss('cheking')
        }
    })


    const sendData = (e) => {
        e.preventDefault();

        if (name == '') {
            toast.error("Name is required..!")
        } else if (email == '') {
            toast.error("Email is required..!")
        } else if (contactNo == '') {
            toast.error("Contact Number is required..!")
        } else if (password == '') {
            toast.error("Password is required..!")
        } else if (name != '' && email != '' && contactNo != '' && password != '' && confirmPwd != '') {
            if (password === confirmPwd) {

                const form = {
                    name: name,
                    email: email,
                    contactNo: contactNo,
                    password: password
                }
                dispatch(Signup(form))
                setName('')
                setEmail('')
                setContactNo('')
                setPassword('')
                setConfirmPwd('')

            } else {
                toast.error("Password doesnot matching..!")
            }
        }
    }

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <div
                    className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <a href="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                            <img src={logo} width="180" alt="" />
                                        </a>
                                        <form>
                                            <div className="mb-3">
                                                <label for="exampleInputtext1" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="exampleInputtext1" aria-describedby="textHelp" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputContact" className="form-label">Email Address</label>
                                                <input type="email" className="form-control" id="exampleInputContact" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputtext1" className="form-label">Contact No</label>
                                                <input type="text" className="form-control" id="exampleInputtext1" aria-describedby="emailHelp" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                                            </div>
                                            <div className="mb-4">
                                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            <div className="mb-4">
                                                <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword2" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                                            </div>
                                            <button onClick={sendData} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign Up</button>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                                                <a className="text-primary fw-bold ms-2" href="/login">Sign In</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default register