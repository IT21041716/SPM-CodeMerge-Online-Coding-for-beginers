import React from 'react'
import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AddLanguage } from '../actions/languageActions';
import { toast } from 'react-hot-toast'




const newLanguage = () => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.language.loading)

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
        }else if(pageTitle === ''){
            toast.error("Page Title is Required.!",{
                id: 'paget'
            })
        } else if(pageSubTitle === ''){
            toast.error("Page Sub Title is Required.!",{
                id: 'pagesub'
            })
        }else if (coverImage === undefined || '') {
            toast.error("Cover Image is required..!", {
                id: 'cvimage'
            })
        }else if (name != '' && description != '' && pageSubTitle != '' && pageTitle != '' && coverImage != '' || coverImage != undefined && files != '' || files != undefined) {
            const form = new FormData();
            form.append("name", name);
            form.append("description", description);
            form.append("pageTitle", pageTitle);
            form.append("pageSubTitle", pageSubTitle);
            form.append("coverImage", coverImage);
            form.append("files", files)

            dispatch(AddLanguage(form))
            setName('')
            setDescription('')
            setFiles('')
            setCoverImage('')
            setPageTitle('')
            setPageSubTitle('')
        }

    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginBottom: '2rem' }}>
                <div className="card mb-4" style={{ width: "45rem", marginLeft: "auto", marginRight: "auto", marginTop: "5rem" }}>
                    <div className="card-header"><b>Add New Language</b></div>
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
                                    />
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">

                                <div className="col-md-6">
                                    <label className="small mb-1" >Page Cover Image</label>
                                    <Form.Control
                                        type='file'
                                        onChange={(e) => { handleCatImg2(e) }}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#3da58a", borderStyle: "none" }}>Save Language</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default newLanguage