import { Form } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddLanguage } from '../actions/languageActions';
import { toast } from 'react-hot-toast'
import logo from '../assets/IT21041716/logo2.png'
import avatar from '../assets/IT21041716/avatr.png'
import { signout } from '../actions/authAction';
import { Navigate } from 'react-router-dom'

const addNewLan = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.language.loading);
    const authenticated = useSelector((state) => state.auth.authenticated);
    const coverImageInputRef = useRef(null);
    const filesInputRef = useRef(null);


    useEffect(() => {
        if (loading === true) {
            toast.loading('Loading...', {
                id: 'loading'
            })
        }
        else if (loading === false) {
            toast.dismiss('loading')
        }

    }, [loading]);
    //hooks
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [pageTitle, setPageTitle] = useState("");
    const [pageSubTitle, setPageSubTitle] = useState("");
    const [files, setFiles] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const user = useSelector((state) => state.auth.user)
    
    const handleCatImg = (e) => {
        const file = e.target.files[0];
        setFiles(file);

    }
    const handleCatImg2 = (e) => {
        const file = e.target.files[0];
        setCoverImage(file);
    }

    const sendData = (e) => {
        e.preventDefault();

        if (name === '') {
            toast.error("Name is required..!", {
                id: 'name'
            })
        } else if (description === '') {
            toast.error("Description is required..!", {
                id: 'desc'
            })
        } else if (files === undefined || '') {
            toast.error("Image is required..!", {
                id: 'image'
            })
        } else if (pageTitle === '') {
            toast.error("Page Title is Required.!", {
                id: 'paget'
            })
        } else if (pageSubTitle === '') {
            toast.error("Page Sub Title is Required.!", {
                id: 'pagesub'
            })
        } else if (name !== '' && description !== '' && pageSubTitle !== '' && pageTitle !== '' && files !== null && files !== undefined) {

            const form = new FormData();
            form.append("name", name);
            form.append("description", description);
            form.append("files", files);
            form.append("pageTitle", pageTitle)
            form.append("pageSubTitle", pageSubTitle);

            if (coverImage) {
                form.append("coverImage", coverImage);
            } else if (coverImage) {
                form.append("coverImage", new File([], 'empty'));
            }

            dispatch(AddLanguage(form))
            setName('')
            setDescription('')
            setPageTitle('')
            setPageSubTitle('')
            coverImageInputRef.current.value = "";
            filesInputRef.current.value = "";

        }
    }
    const logout = () => {
        dispatch(signout());
    };

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                {/* <!-- Sidebar Start --> */}
                <aside className="left-sidebar">
                    {/* <!-- Sidebar scroll--> */}
                    <div>
                        <div className="brand-logo d-flex align-items-center justify-content-between">
                            <a href="/" className="text-nowrap logo-img">
                                <img src={logo} width="180" alt="" style={{ marginTop: '2rem' }} />
                            </a>
                            <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                                <i className="ti ti-x fs-8"></i>
                            </div>
                        </div>
                        {/* <!-- Sidebar navigation--> */}
                        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                            <ul id="sidebarnav">
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                    <span className="hide-menu" >Home</span>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-layout-dashboard"></i>
                                        </span>
                                        <span className="hide-menu">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                    <span className="hide-menu">COMPONENTS</span>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/languages" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-article"></i>
                                        </span>
                                        <span className="hide-menu">Languages</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/newLanguage" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-alert-circle"></i>
                                        </span>
                                        <span className="hide-menu">Add New Language</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/game/view" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-cards"></i>
                                        </span>
                                        <span className="hide-menu">Game Center</span>
                                    </a>
                                </li>
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                    <span className="hide-menu">ACTIONS</span>
                                </li>
                                <li className="sidebar-item">
                                    <button onClick={logout} className="sidebar-link" href="./authentication-login.html" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-login"></i>
                                        </span>
                                        <span className="hide-menu">Logout</span>
                                    </button>
                                </li>
                            </ul>
                            <div >

                            </div>
                        </nav>
                        {/* <!-- End Sidebar navigation --> */}
                    </div>
                    {/* <!-- End Sidebar scroll--> */}
                </aside>
                {/* <!--  Sidebar End -->
        <!--  Main wrapper --> */}
                <div className="body-wrapper">
                    {/* <!--  Header Start --> */}
                    <header className="app-header">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                                <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <img src={avatar} alt="" width="35" height="35" className="rounded-circle" />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                            <div className="message-body">
                                                <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                                                    <i className="ti ti-user fs-6"></i>
                                                    <p className="mb-0 fs-3">{user.name}</p>
                                                </a>
                                                <a href="javascript:void(0)" class="d-flex align-items-center gap-2 dropdown-item">
                                                    <i class="ti ti-mail fs-6"></i>
                                                    <p class="mb-0 fs-3">{user.email}</p>
                                                </a>
                                                <button onClick={logout} className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</button>
                                            </div>
                                        </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                    {/* <!--  Header End --> */}
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">Languages</h5>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginBottom: '2rem' }}>
                                    <div style={{ width: "45rem", marginLeft: "auto", marginRight: "auto", marginTop: '-11rem' }}>
                                        <div className="card-body">
                                            <form onSubmit={sendData} encType="multipart/form-data" >

                                                <div className="mb-3">
                                                    <label className="small mb-1" for="inputUsername">Language Name</label>
                                                    <input className="form-control" id="inputUsername" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small mb-1" for="inputUsername">Page Title</label>
                                                    <input className="form-control" id="inputUsername" type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small mb-1" for="inputUsername">Page Sub Title</label>
                                                    <input className="form-control" id="inputUsername" type="text" value={pageSubTitle} onChange={(e) => setPageSubTitle(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small mb-1" for="inputUsername">Description</label>
                                                    <textarea className="form-control" rows='3' col='10' id="inputEmailAddress" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                </div>

                                                <div className="row gx-3 mb-3">

                                                    <div className="col-md-6">
                                                        <label className="small mb-1" >Image</label>
                                                        <Form.Control
                                                            type='file'
                                                            onChange={(e) => { handleCatImg(e) }}
                                                            ref={filesInputRef}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="small mb-1" >Page Cover Image</label>
                                                        <Form.Control
                                                            type='file'
                                                            onChange={(e) => { handleCatImg2(e) }}
                                                            ref={coverImageInputRef}
                                                        />
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#3da58a", borderStyle: "none" }}>Save Language</button>
                                            </form>
                                        </div>
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

export default addNewLan