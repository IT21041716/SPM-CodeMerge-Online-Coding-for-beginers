import React, { useEffect, useState } from 'react'
import logo from '../assets/IT21041716/logo2.png'
import avatar from '../assets/IT21041716/avatr.png'
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import { signout } from '../actions/authAction';

const dashboard = () => {
    const [time, setTime] = useState(new Date());
    const dispatch = useDispatch();
    const authenticated = useSelector((state) => state.auth.authenticated)
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
                                            <div className="message-body">
                                                <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                                                    <i className="ti ti-user fs-6"></i>
                                                    <p className="mb-0 fs-3">My Profile</p>
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
                                                <h5 className="card-title fw-semibold">Sales Overview</h5>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div class="card overflow-hidden">
                                            {/* <h5 class="card-title mb-9 fw-semibold">Yearly Breakup</h5>
                                        <div className="clock">
                                            <div className="time">Time{formattedTime}</div>
                                            <div className="date">Date{formattedDate}</div>
                                        </div> */}

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
                                <div className="col-lg-12">
                                    {/* <!-- Monthly Earnings --> */}
                                    <div className="card">
                                        <div className="card-body">

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
                                        <h5 className="card-title fw-semibold">Recent Transactions</h5>
                                    </div>
                                    <ul className="timeline-widget mb-0 position-relative mb-n5">

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 d-flex align-items-stretch">
                            <div className="card w-100">
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-semibold mb-4">Recent Transactions</h5>
                                    <div className="table-responsive">
                                        <table className="table text-nowrap mb-0 align-middle">
                                            <thead className="text-dark fs-4">
                                                <tr>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Id</h6>
                                                    </th>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Assigned</h6>
                                                    </th>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Name</h6>
                                                    </th>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Priority</h6>
                                                    </th>
                                                    <th className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">Budget</h6>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">1</h6></td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-1">Sunil Joshi</h6>
                                                        <span className="fw-normal">Web Designer</span>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <p className="mb-0 fw-normal">Elite Admin</p>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span className="badge bg-primary rounded-3 fw-semibold">Low</span>
                                                        </div>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0 fs-4">$3.9</h6>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">2</h6></td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-1">Andrew McDownland</h6>
                                                        <span className="fw-normal">Project Manager</span>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <p className="mb-0 fw-normal">Real Homes WP Theme</p>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span className="badge bg-secondary rounded-3 fw-semibold">Medium</span>
                                                        </div>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0 fs-4">$24.5k</h6>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">3</h6></td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-1">Christopher Jamil</h6>
                                                        <span className="fw-normal">Project Manager</span>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <p className="mb-0 fw-normal">MedicalPro WP Theme</p>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span className="badge bg-danger rounded-3 fw-semibold">High</span>
                                                        </div>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0 fs-4">$12.8k</h6>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">4</h6></td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-1">Nirav Joshi</h6>
                                                        <span className="fw-normal">Frontend Engineer</span>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <p className="mb-0 fw-normal">Hosting Press HTML</p>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span className="badge bg-success rounded-3 fw-semibold">Critical</span>
                                                        </div>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0 fs-4">$2.4k</h6>
                                                    </td>
                                                </tr>
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