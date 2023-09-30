import React from 'react'
import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast'
import { AddNew } from '../actions/materialAction';

const addNewMaterial = () => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.material.loading)
    const useparams = useParams();
    console.log(useparams.language)

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


    const [number, setNumber] = useState('');
    const [language, setLanguage] = useState('');
    const [title, setTitle] = useState('');
    const [pdf, setPdf] = useState(undefined);
    const [video, setVideo] = useState(undefined);


    const handlePdf = (e) => {
        const file = e.target.files[0];
        setPdf(file);

    }
    const handleVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file);

    }

    const sendData = (e) => {
        e.preventDefault();

        if (number === '') {
            toast.error("number Required..!", {
                id: 'number'
            })
        } else if (language === '') {
            toast.error("language required..!", {
                id: 'language'
            })
        } else if (title === '') {
            toast.error("title Required..!", {
                id: 'title'
            })
        } else if (pdf === undefined && video === undefined) {
            toast.error("pdf or video Required..!")
        } else if (number != '' && language != '' && title != '' && pdf != undefined || video != undefined) {
            const form = new FormData();
            form.append('number', number)
            form.append('title', title)
            form.append('language', language)
            form.append('pdf', pdf)
            form.append('vedio', video)

            dispatch(AddNew(form))
            setNumber('')
            setLanguage('')
            setTitle('')
            setPdf(undefined)
            setVideo(undefined)
        }
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="card mb-4" style={{ width: "45rem", marginLeft: "auto", marginRight: "auto", marginTop: "5rem" }}>
                    <div className="card-header"><b>Create New Learning Material</b></div>
                    <div className="card-body">
                        <form onSubmit={sendData} encType="multipart/form-data" >

                            <div className="mb-3">
                                <label className="small mb-1" for="inputLastName">Language</label>
                                <input className="form-control" id="inputLastName" type="text" value={useparams.language} disabled/>
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
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1" >Lecture Video</label>
                                    <Form.Control
                                        type='file'
                                        onChange={(e) => { handleVideo(e) }}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#3da58a", borderStyle: "none" }}>Save Material</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default addNewMaterial