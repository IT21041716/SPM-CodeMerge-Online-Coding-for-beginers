import React, { useEffect, useState, useRef } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { DeletLanguage, getAll, UpdateLanguage } from '../actions/languageActions';
import { AddNew } from '../actions/materialAction'
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-react-ui-kit';
import { Col, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';
import bg from '../assets/IT21041716/bg.jpg'
import { toast } from 'react-hot-toast'
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import logo from '../assets/IT21041716/logo2.png'
import avatar from '../assets/IT21041716/avatr.png'
import { Navigate } from 'react-router-dom'
import { signout } from '../actions/authAction';


const Languages = () => {

    // main table 
    const dispatch = useDispatch();
    const allLanguages = useSelector(state => state.language.allLanguages);
    const authenticated = useSelector((state) => state.auth.authenticated);
    const loading = useSelector(state => state.language.loading)
    const loading2 = useSelector((state) => state.material.loading)

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

    useEffect(() => {
        if (loading2 === true) {
            toast.loading('Loading...', {
                id: 'loading'
            })
        }
        else if (loading2 === false) {
            toast.dismiss('loading')
        }

    }, [loading2]);

    useEffect(() => {
        dispatch(getAll())
    }, [])


    //view modal 
    const [shDataModel, setShDataModel] = useState(false);
    const [datas, setDatas] = useState('')
    const [number, setnumber] = useState('')

    const DataModelShow = (data, index) => {
        setShDataModel(true);
        setDatas(data)
        setnumber(index)

    }

    const DataModelClose = (e) => {
        setShDataModel(false);

    }

    const DisplayModel = () => {
        return (
            <MDBModal show={shDataModel} setShow={setShDataModel} tabIndex='-1'>
                <MDBModalDialog centered className="modal-dialog modal-dialog-scrollable" style={{ maxWidth: '800px' }}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle style={{ fontWeight: '600' }}>LANGUAGE DETAILS</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={DataModelClose}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <div style={{ display: "flex", direction: "row" }}>

                                <Col md={6}>
                                    <label style={{ fontSize: "15px", fontWeight: "600" }}>Number</label>
                                    <p style={{ fontSize: "12px", fontWeight: "500" }}>{number + 1}  </p>
                                </Col>
                                <Col md={6}>
                                    <label style={{ fontSize: "15px", fontWeight: "600" }} >Language</label>
                                    <p style={{ fontSize: "12px", fontWeight: "500" }}>{datas.name}</p>
                                </Col>
                            </div>
                            <div style={{ display: "flex", direction: "row" }}>

                                <Col md={6}>
                                    <label style={{ fontSize: "15px", fontWeight: "600" }}>Page Title</label>
                                    <p style={{ fontSize: "12px", fontWeight: "500" }}>{datas.pageTitle}  </p>
                                </Col>
                                <Col md={6}>
                                    <label style={{ fontSize: "15px", fontWeight: "600" }} >Page Sub Title</label>
                                    <p style={{ fontSize: "12px", fontWeight: "500" }}>{datas.pageSubTitle}</p>
                                </Col>
                            </div>
                            <div style={{ display: "flex", direction: "row" }}>

                                <Col md={12}>
                                    <label style={{ fontSize: "15px", fontWeight: "600" }}>Description</label>
                                    <p style={{ fontSize: "12px", fontWeight: "500" }}>{datas.description}  </p>
                                </Col>
                            </div>
                            <div style={{ display: "flex", direction: "row" }}>

                                <Col md={6}>
                                    <label style={{ fontSize: "15px", fontWeight: "600" }}>Language Logo</label><br />
                                    <img src={`../../../public/uploads/LanguageImages/${datas.imageUrl}`} style={{ width: '200px', height: '200px', marginTop: '1rem' }} />
                                </Col>
                                <Col md={6}>
                                    <label style={{ fontSize: "15px", fontWeight: "600" }}>Language Wallpaper</label><br />
                                    <img src={datas.coverImageUrl ? `../../../public/uploads/LanguageImages/${datas.coverImageUrl}` : bg} style={{ width: '300px', height: '200px', marginTop: '1rem' }} />
                                </Col>
                            </div>


                        </MDBModalBody>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal" onClick={DataModelClose}>Close</button>
                        </div>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        )
    }

    // update modal 
    const [shUpdateModel, setShUpdateModel] = useState(false);
    const coverImageInputRef = useRef(null);
    const filesInputRef = useRef(null);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [pageSubTitle, setPageSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null)
    const [files, setFiles] = useState(null)

    const UpdateModelShow = (data, index) => {
        setShUpdateModel(true);
        setName(data.name)
        setId(data.id)
        setPageTitle(data.pageTitle)
        setPageSubTitle(data.pageSubTitle)
        setDescription(data.description)
        setFiles(data.imageUrl)
        setCoverImage(data.coverImageUrl)
    }

    const UpdateModelClose = (e) => {
        setShUpdateModel(false);

    }

    const languageImageFun = (e) => {
        const file = e.target.files[0];
        setFiles(file)

    }

    const coverImageFun = (e) => {
        const file = e.target.files[0];
        setCoverImage(file)
    }

    const sendData = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("id", id)
        form.append("name", name);
        form.append("description", description);
        form.append("pageTitle", pageTitle)
        form.append("pageSubTitle", pageSubTitle);
        if (files) {
            form.append("files", files)
        } else {
            form.append("files", new File([], 'empty'));
        }
        if (coverImage) {
            form.append("coverImage", coverImage);
        } else {
            form.append("coverImage", new File([], 'empty'));
        }

        dispatch(UpdateLanguage(form));
        coverImageInputRef.current.value = "";
        filesInputRef.current.value = "";

    }

    const DisplayUpdateModel = () => {
        return (
            <MDBModal show={shUpdateModel} setShow={setShUpdateModel} tabIndex='-1'>
                <MDBModalDialog centered className="modal-dialog modal-dialog-scrollable" style={{ maxWidth: '800px' }}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle style={{ fontWeight: '600' }}>UPDATE LANGUAGE DETAILS</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={UpdateModelClose}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

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
                                        <textarea className="form-control" rows='5' col='10' id="inputEmailAddress" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>

                                    <div style={{ display: "flex", direction: "row" }}>

                                        <Col md={6}>
                                            <label style={{ fontSize: "15px", fontWeight: "600" }}>Language Logo</label><br />
                                            <img src={`../../../public/uploads/LanguageImages/${files}`} style={{ width: '200px', height: '200px', marginTop: '1rem' }} /><br /><br />
                                            <Form.Control
                                                type='file'
                                                onChange={(e) => languageImageFun(e)}
                                                ref={filesInputRef}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <label style={{ fontSize: "15px", fontWeight: "600" }}>Language Wallpaper</label><br />
                                            <img src={`../../../public/uploads/LanguageImages/${coverImage}`} style={{ width: '300px', height: '200px', marginTop: '1rem' }} /><br /><br />
                                            <Form.Control
                                                type='file'
                                                onChange={(e) => coverImageFun(e)}
                                                ref={coverImageInputRef}
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


    //add material modal
    const [shModel, setShModel] = useState(false);
    const [language, setLanguage] = useState("");
    const [title, setTitle] = useState('');
    const [pdf, setPdf] = useState(null);
    const [video, setVideo] = useState(null);
    const pdfInputRef = useRef(null);
    const vedioInputRef = useRef(null);

    const ModelShow = (data) => {
        setShModel(true);
        setLanguage(data)

    }

    const ModelClose = (e) => {
        setShModel(false);

    }

    const handlePdf = (e) => {
        const file = e.target.files[0];
        setPdf(file);

    }
    const handleVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file);

    }

    const sendData1 = (e) => {
        e.preventDefault();

        if (title === '') {
            toast.error("title Required..!", {
                id: 'title'
            })
        } else if (pdf === null) {
            toast.error("pdf is Required..!")
        } else if (video === null) {
            toast.error("video is Required..!")
        } else if (title != '' && pdf != null && video != null) {
            const form = new FormData();
            form.append("language", language);
            form.append('title', title)
            form.append('pdf', pdf)
            form.append('vedio', video)

            dispatch(AddNew(form))
            setTitle('')
            pdfInputRef.current.value = "";
            vedioInputRef.current.value = "";
        }
    }

    const DisplayModelMaterial = () => {
        return (
            <MDBModal show={shModel} setShow={setShModel} tabIndex='-1'>
                <MDBModalDialog centered className="modal-dialog modal-dialog-scrollable" style={{ maxWidth: '800px' }}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle style={{ fontWeight: '600' }}>ADD NEW MATERIAL</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={ModelClose}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form onSubmit={sendData1} encType="multipart/form-data" >

                                <div className="mb-3">
                                    <label className="small mb-1" for="inputLastName">Language</label>
                                    <input className="form-control" id="inputLastName" type="text" value={language} disabled />
                                </div>

                                <div className="mb-3">
                                    <label className="small mb-1" for="inputUsername">Title</label>
                                    <input className="form-control" id="inputUsername" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" >PDF Content</label>
                                        <Form.Control
                                            type='file'
                                            onChange={(e) => { handlePdf(e) }}
                                            ref={pdfInputRef}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" >Lecture Video</label>
                                        <Form.Control
                                            type='file'
                                            onChange={(e) => { handleVideo(e) }}
                                            ref={vedioInputRef}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#3da58a", borderStyle: "none" }}>Save Material</button>
                            </form>
                        </MDBModalBody>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal" onClick={ModelClose}>Close</button>
                        </div>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        )
    }



    const deleteLanguage = (data) => {
        const id = data.id;
        const language = data.name;

        Swal.fire({
            title: 'Are you sure want to Delete this Language?',
            icon: 'question',
            html: '<p style ="font-size: 16px">Deleting this language will also result in the removal of its associated study materials.</p><span style="font-size: 14px; color: gray;">Do you still want to proceed?</span>',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!'

        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(DeletLanguage(id, language))
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
                            <a href="./index.html" className="text-nowrap logo-img">
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
                                                    <h6 className="fw-semibold mb-0">Actions</h6>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allLanguages.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="border-bottom-0"><h6 className="fw-normal">{index + 1}</h6></td>
                                                        <td className="border-bottom-0"><h6 className="fw-normal">{data.name}</h6></td>
                                                        <td className="border-bottom-0">
                                                            <div style={{ display: "flex", flexDirection: "row", marginLeft: '-3rem' }}>
                                                                <Tooltip title="View Details">
                                                                    <IconButton onClick={(e) => { DataModelShow(data, index) }}>
                                                                        <RemoveRedEyeIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Update Language">
                                                                    <IconButton onClick={(e) => { UpdateModelShow(data) }} >
                                                                        <CheckIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Delete Language">
                                                                    <IconButton onClick={(e) => { deleteLanguage(data) }}>
                                                                        <DeleteIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Add New Material">
                                                                    <IconButton onClick={(e) => { ModelShow(data.name) }}>
                                                                        <PlaylistAddIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Manage Materials">
                                                                    <Link to={`/Material/${data.name}`}>
                                                                        <IconButton>
                                                                            <SettingsIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {DisplayModel()}
                                {DisplayUpdateModel()}
                                {DisplayModelMaterial()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Languages