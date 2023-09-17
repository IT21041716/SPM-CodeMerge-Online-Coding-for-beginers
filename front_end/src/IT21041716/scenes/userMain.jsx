import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import './common.css'
import { getAll } from '../actions/languageActions';
import { Link } from 'react-router-dom';

const userMain = () => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.language.loading)
    const languages = useSelector(state => state.language.allLanguages)

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
        dispatch(getAll())
    }, [])


    return (
        <>
            <br /><br /><br />
            <h1><center><b>Languages</b></center></h1>
            <br /><br /><br />
            <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{ paddingLeft: '7rem', paddingRight: '7rem' }}>
                {
                    languages.map((data, index) => (
                        <MDBCol key={index} >
                            <MDBCard style={{maxHeight: '650px'}}>
                                <MDBCardImage src={`../../../public/uploads/LanguageImages/${data.imageUrl}`} position='top' alt='...' style={{ objectFit: 'cover' }} />
                                <MDBCardBody style={{ display: 'flex', flexDirection: 'column', height: '500px', maxHeight: '500px' }}>
                                    <MDBCardTitle style={{ fontSize: '32px', fontWeight: 'bold' }}>{data.name}</MDBCardTitle>
                                    <MDBCardText className ='cardText-size'>
                                        {data.description}
                                    </MDBCardText>
                                    <Link to= {`/language/${data.id}`}>
                                        <MDBBtn color='info' >Info</MDBBtn>
                                    </Link>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))
                }
            </MDBRow>


        </>
    )
}

export default userMain