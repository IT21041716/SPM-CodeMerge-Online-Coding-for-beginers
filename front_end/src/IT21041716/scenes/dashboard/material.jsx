import React, { useEffect, useState, useRef } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getAllMaterial, updateMaterial } from '../../actions/materialAction'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-react-ui-kit';
import { Col, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast'
import Tooltip from '@mui/material/Tooltip';
import { Link, useParams } from 'react-router-dom'


const material = () => {
    const dispatch = useDispatch();
    const useparams = useParams();
    const allMaterial = useSelector((state) => state.material.allMaterial)
    const loading = useSelector((state) => state.material.loading)


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

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                <MDBTable hover style={{ width: '80%' }}>
                    <MDBTableHead>
                        <tr style={{ backgroundColor: '#4f4f4f9a' }}>
                            <th scope='col' style={{ fontWeight: 'bold', textAlign: 'center' }}>No</th>
                            <th scope='col' style={{ fontWeight: 'bold', textAlign: 'center' }}>Language Name</th>
                            <th scope='col' style={{ fontWeight: 'bold', textAlign: 'center' }}>Title</th>
                            <th scope='col' style={{ fontWeight: 'bold', textAlign: 'center' }}>PDF</th>
                            <th scope='col' style={{ fontWeight: 'bold', textAlign: 'center' }}>Video</th>
                            <th scope='col' style={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            allMaterial.map((data, index) => (
                                <tr key={index}>
                                    <th scope='row' style={{ textAlign: 'center' }}>{index + 1}</th>
                                    <td style={{ textAlign: 'center' }}>{data.language}</td>
                                    <td style={{ textAlign: 'center' }}>{data.title}</td>
                                    <td style={{ textAlign: 'center' }}><a href={`../../../../public/uploads/pdf/${data.pdfUrl}`} target='blank'>{data.pdfUrl}</a></td>
                                    <td style={{ textAlign: 'center' }}><Link to={`/player/${data.id}`} target='blank'>{data.vedioUrl}</Link></td>
                                    <td>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                                            <Tooltip title="Update Language">
                                                <IconButton onClick={(e) => { UpdateModelShow(data, index) }} >
                                                    <CheckIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Language">
                                                <IconButton onClick={(e) => { }}>
                                                    <DeleteIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </MDBTableBody>
                </MDBTable>
            </div>
            {DisplayUpdateModel()}
        </>
    )
}

export default material