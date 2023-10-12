import React, { useEffect, useState } from 'react'
import logo from '../assets/IT21041716/logo2.png'
import avatar from '../assets/IT21041716/avatr.png'
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import { signout } from '../actions/authAction';
import axios from 'axios'


const dashboard = () => {
    const [time, setTime] = useState(new Date());
    const dispatch = useDispatch();
    const authenticated = useSelector((state) => state.auth.authenticated)
    const user = useSelector((state) => state.auth.user)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const formattedTime = time.toLocaleTimeString();
    const formattedDate = time.toLocaleDateString();

    const logout = () => {
        dispatch(signout());
    };


    const [pdfData, setPdfData] = useState([]);
    const [videoData, setVideoData] = useState([]);

    const fetchPdfData = () => {
        axios.get('http://localhost:8080/api/pdfView/getAll')
            .then((res) => {
                setPdfData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchVideoData = () => {
        axios.get('http://localhost:8080/api/videoView/getAll')
            .then((res) => {
                setVideoData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchPdfData();
        fetchVideoData();
    }, []);

    const lastThreevideo = videoData.slice(-3);
    const lastThreeMaterials = pdfData.slice(-3);

    if (!authenticated) {
        return <Navigate to='/login' />
    }
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
                                    <button onClick={logout} className="sidebar-link" aria-expanded="false">
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
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                    {/* <!--  Header End --> */}
                    <div className="container-fluid">
                        {/* <!--  Row 1 --> */}
                        <div className="row">
                            <div className="col-lg-8 d-flex align-items-strech">
                                <div className="card w-100">
                                    <div className="card-body">
                                        <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                                            <div className="mb-3 mb-sm-0">
                                                <h5 className="card-title fw-semibold">Recent Watched Pdf</h5>
                                                <div className="table-responsive" style={{ marginLeft: '5rem', marginRight: 'auto' }}>
                                                    <table className="table text-nowrap mb-0 align-middle" >
                                                        <thead className="text-dark fs-4">
                                                            <tr>
                                                                <th className="border-bottom-0">
                                                                    <h6 className="fw-semibold mb-0">No</h6>
                                                                </th>
                                                                <th className="border-bottom-0">
                                                                    <h6 className="fw-semibold mb-0">User</h6>
                                                                </th>
                                                                <th className="border-bottom-0">
                                                                    <h6 className="fw-semibold mb-0">Title</h6>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                lastThreeMaterials.map((data, index) => (
                                                                    <tr key={index}>
                                                                        <td className="border-bottom-0">
                                                                            <p className="mb-0 fw-normal">{index + 1}</p>
                                                                        </td>
                                                                        <td className="border-bottom-0">
                                                                            <p className="mb-0 fw-normal">{data.user}</p>
                                                                        </td>
                                                                        <td className="border-bottom-0">
                                                                            <p className="mb-0 fw-normal">{data.pdfTitle}</p>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div class="card overflow-hidden">
                                            <div class="card-body p-4">
                                                <h5 class="card-title mb-9 fw-semibold">Clock</h5>
                                                <div class="row align-items-center">
                                                    <div class="col-8">
                                                        <h4 class="fw-semibold mb-3">Time Now - <span>{formattedTime}</span></h4>
                                                        <h4 class="fw-semibold mb-3">Today - <span>{formattedDate}</span></h4>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="d-flex justify-content-center">
                                                            <div id="breakup"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 d-flex align-items-stretch">
                            <div className="card w-100">
                                <div className="card-body p-4">
                                    <div className="mb-4">
                                        <h5 className="card-title fw-semibold">User Details</h5>
                                    </div>
                                    <ul className="timeline-widget mb-0 position-relative mb-n5">
                                        <li>Full Name -:  {user.name}</li><br/>
                                        <li>Email -:  {user.email}</li><br/>
                                        <li>Contact Number -: {user.contactNo}</li><br/>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 d-flex align-items-stretch">
                            <div className="card w-100">
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-semibold mb-4">Recent Watched Videos</h5>
                                    <div className="table-responsive" style={{ marginLeft: '5rem', marginRight: 'auto' }}>
                                        <table className="table text-nowrap mb-0 align-middle" >
                                            <thead className="text-dark fs-4">
                                                <tr>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">No</h6>
                                                    </th>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">User</h6>
                                                    </th>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Title</h6>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    lastThreevideo.map((data, index) => (
                                                        <tr key={index}>
                                                            <td className="border-bottom-0">
                                                                <p className="mb-0 fw-normal">{index + 1}</p>
                                                            </td>
                                                            <td className="border-bottom-0">
                                                                <p className="mb-0 fw-normal">{data.user}</p>
                                                            </td>
                                                            <td className="border-bottom-0">
                                                                <p className="mb-0 fw-normal">{data.videoTitle}</p>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
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

export default dashboard