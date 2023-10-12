import React from 'react'
import logo from '../../../../public/logo2.png'
import { Link } from 'react-router-dom'
const header = () => {

    const id = localStorage.getItem("userId")


    return (
        <div>
            <nav className="fh5co-nav" role="navigation">
                <div className="top-menu">
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }} >
                            <div className="col-xs-2">
                                <div><a href="/"><img src={logo} style={{ width: '300px', height: '110px' }} /></a></div>
                            </div>
                            <div className="col-xs-10 text-right menu-1">
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/learning">Start Learning</a></li>
                                    <li><a href="/admin">Compiler</a></li>
                                    <li><Link to = {`/userProfile/${id}`}><a >Community</a></Link></li>
                                    <li><a href="/admin">About</a></li>
                                    <li className="btn-cta"><a href="#"><span>Login</span></a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default header