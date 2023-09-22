import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { DeletLanguage, getAll, UpdateLanguage } from '../../actions/languageActions';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CheckIcon from '@mui/icons-material/Check';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-react-ui-kit';
import { Col, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';


const languages = () => {

    // main table 
    const dispatch = useDispatch();
    const allLanguages = useSelector(state => state.language.allLanguages);
    console.log(allLanguages)


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
                                    <img src={`../../../public/uploads/LanguageImages/${datas.coverImageUrl}`} style={{ width: '300px', height: '200px', marginTop: '1rem' }} />
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
    const [data, setData] = useState('')
    const [no, setNo] = useState('')

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [pageSubTitle, setPageSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('')
    const [files, setFiles] = useState('')


    const UpdateModelShow = (data, index) => {
        setShUpdateModel(true);
        setData(data)
        setNo(index)
        setId(data.id)
        setName(data.name);
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
        const file = e.target.file[0];
        if(file != null){
            setFiles(file)
        }else{
            setFiles(null)
        }
    }

    const coverImageFun = (e) => {
        const file = e.target.file[0];
        if(file != null){
            setCoverImage(file)
        }else{
            setFiles(null)
        }

    }

    const sendData = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("id", id)
        form.append("name", name);
        form.append("description", description);
        form.append("pageTitle", pageTitle)
        form.append("pageSubTitle", pageSubTitle);
        form.append("coverImage", coverImage);
        form.append("files", files)

        dispatch(UpdateLanguage(form));

    }

    const DisplayUpdateModel = () => {
        return (
            <MDBModal show={shUpdateModel} setShow={setShUpdateModel} tabIndex='-1'>
                <MDBModalDialog centered className="modal-dialog modal-dialog-scrollable" style={{ maxWidth: '800px' }}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle style={{ fontWeight: '600' }}>LANGUAGE DETAILS</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={UpdateModelClose}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <div className="card-body">
                                <form onSubmit={sendData} encType="multipart/form-data" >

                                    <div className="mb-3">
                                        <label className="small mb-1" for="inputUsername">Language Name</label>
                                        <input className="form-control" id="inputUsername" type="text" value={data.name} disable />
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
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <label style={{ fontSize: "15px", fontWeight: "600" }}>Language Wallpaper</label><br />
                                            <img src={`../../../public/uploads/LanguageImages/${coverImage}`} style={{ width: '300px', height: '200px', marginTop: '1rem' }} /><br /><br />
                                            <Form.Control
                                                type='file'
                                                onChange={(e) => coverImageFun(e)}
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



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                <MDBTable hover style={{ width: '50%' }}>
                    <MDBTableHead>
                        <tr style={{ backgroundColor: '#4f4f4f9a' }}>
                            <th scope='col' style={{ fontWeight: 'bold', textAlign: 'center' }}>No</th>
                            <th scope='col' style={{ fontWeight: 'bold', textAlign: 'center' }}>Language Name</th>
                            <th scope='col' style={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            allLanguages.map((data, index) => (
                                <tr key={index}>
                                    <th scope='row' style={{ textAlign: 'center' }}>{index + 1}</th>
                                    <td style={{ textAlign: 'center' }}>{data.name}</td>
                                    <td>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>

                                            <IconButton onClick={(e) => { DataModelShow(data, index) }}>
                                                <RemoveRedEyeIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                            </IconButton>

                                            <IconButton onClick={(e) => { UpdateModelShow(data) }} >
                                                <CheckIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                            </IconButton>

                                            <IconButton onClick={(e) => { deleteLanguage(data) }}>
                                                <DeleteIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                            </IconButton>

                                            <IconButton onClick={(e) => { }}>
                                                <PlaylistAddIcon size={20} style={{ color: "#243556", height: "1.2rem" }} />
                                            </IconButton>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </MDBTableBody>
                </MDBTable>
            </div>
            {DisplayModel()}
            {DisplayUpdateModel()}
        </>
    )
}

export default languages