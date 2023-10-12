import React, { useEffect, useState, useRef } from 'react'
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getAllMaterial, updateMaterial, DeleteMaterial } from '../actions/materialAction'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-react-ui-kit';
import { Col, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast'
import Tooltip from '@mui/material/Tooltip';
import { Link, useParams } from 'react-router-dom'
import logo from '../assets/IT21041716/logo2.png'
import avatar from '../assets/IT21041716/avatr.png'
import { signout } from '../actions/authAction';

const Material = () => {
    const dispatch = useDispatch();
    const useparams = useParams();
    const allMaterial = useSelector((state) => state.material.allMaterial)
    const loading = useSelector((state) => state.material.loading)
    const user = useSelector((state) => state.auth.user)


    useEffect(() => {
        dispatch(getAllMaterial(useparams.language));
    }, []);

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


    // update modal 
    const [shUpdateModel, setShUpdateModel] = useState(false);
    const [no, setNo] = useState("");
    const [id, setId] = useState("");
    const [language, setLanguage] = useState("");
    const [title, setTitle] = useState("");
    const [pdf, setPdf] = useState(null);
    const [video, setVideo] = useState(null);
    const videoInputRef = useRef(null);
    const filesInputRef = useRef(null);

    const UpdateModelShow = (data, index) => {
        setShUpdateModel(true);
        setId(data.id);
        setNo(index + 1);
        setLanguage(data.language);
        setTitle(data.title);
    }

    const UpdateModelClose = (e) => {
        setShUpdateModel(false);

    }

    const pdfUpload = (e) => {
        const file = e.target.files[0];
        setPdf(file)

    }

    const videoUpload = (e) => {
        const file = e.target.files[0];
        setVideo(file)
    }

    const sendData = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("id", id);
        form.append("title", title);
        form.append("language", language);

        if (pdf) {
            form.append("pdf", pdf);
        }

        if (video) {
            form.append("vedio", video);
        }

        dispatch(updateMaterial(form));
        videoInputRef.current.value = "";
        filesInputRef.current.value = "";
    }


    const DisplayUpdateModel = () => {
        return (
            <MDBModal show={shUpdateModel} setShow={setShUpdateModel} tabIndex='-1'>
                <MDBModalDialog centered className="modal-dialog modal-dialog-scrollable" style={{ maxWidth: '800px' }}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle style={{ fontWeight: '600' }}>UPDATE MATERIAL DETAILS</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={UpdateModelClose}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <div className="card-body">
                                <form onSubmit={sendData} encType="multipart/form-data" >
                                    <div className="row gx-3 mb-3">

                                        <div className="col-md-6">
                                            <label className="small mb-1" for="inputFirstName">No</label>
                                            <input className="form-control" id="inputFirstName" type="text" value={no} disabled />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="small mb-1" for="inputLastName">Language Name</label>
                                            <input className="form-control" id="inputLastName" type="text" value={language} disabled />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" for="inputUsername">Title</label>
                                        <input className="form-control" id="inputUsername" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>

                                    <div className="row gx-3 mb-3">

                                        <Col md={6}>
                                            <label style={{ fontSize: "15px", fontWeight: "500" }}>Pdf</label><br />
                                            <Form.Control
                                                type='file'
                                                onChange={(e) => pdfUpload(e)}
                                                ref={filesInputRef}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <label style={{ fontSize: "15px", fontWeight: "500" }}>Vedio</label><br />
                                            <Form.Control
                                                type='file'
                                                onChange={(e) => videoUpload(e)}
                                                ref={videoInputRef}
                                            />
                                        </Col>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#3da58a", borderStyle: "none", marginTop: '1.5rem' }}>Update Language</button>
                                </form>
                            </div>
                        </MDBModalBody>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal" onClick={UpdateModelClose}>Close</button>
                        </div>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        )
    }

    // delete function

    const deleteMaterial = (data) => {

        const id = data.id;
        const language = data.language;
        console.log(language)

        Swal.fire({
            title: 'Are you sure want to Delete this ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!'

        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(DeleteMaterial(id, language))
            }
        })
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
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">Languages</h5>
                                <div className="table-responsive">
                                    <table className="table text-nowrap mb-0 align-middle">
                                        <thead className="text-dark fs-4">
                                            <tr>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">No</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Language Name</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Title</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Pdf</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Vedio</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Actions</h6>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                allMaterial.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="border-bottom-0"><h6 className="fw-normal">{index + 1}</h6></td>
                                                        <td className="border-bottom-0"><h6 className="fw-normal">{data.language}</h6></td>
                                                        <td className="border-bottom-0"><h6 className="fw-normal">{data.title}</h6></td>
                                                        <td className="border-bottom-0"><a href={`../../public/uploads/pdf/${data.pdfUrl}`} target='_blank'>{data.pdfUrl}</a></td>
                                                        <td className="border-bottom-0"><a className="fw-normal"><Link to={`/player/${data.id}`} target='blank'>{data.vedioUrl}</Link></a></td>
                                                        <td className="border-bottom-0">
                                                            <div style={{ display: "flex", flexDirection: "row", marginLeft: '-0.9rem' }}>
                                                                <Tooltip title="Update Language">
                                                                    <IconButton onClick={(e) => { UpdateModelShow(data, index) }} >
                                                                        <CheckIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Delete Language">
                                                                    <IconButton onClick={(e) => { deleteMaterial(data) }}>
                                                                        <DeleteIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
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
                    {DisplayUpdateModel()}
                </div>
            </div>
        </>
    )
}

export default Material