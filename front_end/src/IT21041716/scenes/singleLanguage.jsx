import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './common.css'
import { toast } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import pdf from '../../assets/IT21041716/pdf.jpeg'
import vedio from '../../assets/IT21041716/vedio.jpeg'
import DashHeader from '../componants/DashHeader'
import { Box } from "@mui/material";
import { getAllMaterial } from '../actions/materialAction'
import { getById } from '../actions/languageActions'
import bg from '../../assets/IT21041716/bg.jpg'

const singleLanguage = () => {

    const dispatch = useDispatch();
    const useparams = useParams();
    const allMaterial = useSelector((state) => state.material.allMaterial)
    const loading = useSelector((state) => state.material.loading)
    const oneData = useSelector((state) => state.language.oneData)
    const id = useparams.id;
    const language = oneData.name;
    
    useEffect(() => {
        dispatch(getById(id));
        dispatch(getAllMaterial(language));
    }, [dispatch, id, language]);

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

    return (
        <>
            <div
                style={{
                    backgroundImage: oneData.coverImageUrl
                    ? `url(../../../public/uploads/LanguageImages/${oneData.coverImageUrl})`
                    : `url(${bg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '400px',
                    backgroundPosition: 'center center',
                    filter: 'brightness(50%)',

                }}
            />

            <Box display='flex' justifyContent="space-between" alignItems="center" position="relative" zIndex='1' marginTop='-100px' paddingLeft='100px'>
                <DashHeader title={oneData.pageTitle} subtitle={oneData.pageSubTitle} />
            </Box>
            <div style={{ marginTop: '5rem', textAlign: 'center', marginBottom: '5rem' }}>
                <h1 style={{ fontWeight: 'bold' }}>{oneData.name} Tutorials For Beginners</h1>
            </div>
            <div style={{ marginBottom: '5rem' }}>
                {
                    allMaterial.map((data, index) => (
                        <div className='main-container' key={index}>
                            <div className='container-heading'>
                                <h2>{data.number}. {data.title}</h2>
                            </div>
                            <div>
                                <div className='one-line'>
                                    <div>
                                        <img src={pdf} className='coloum-icon' />
                                    </div>
                                    <div className='same-line'>
                                        <p className='coloum-para'>
                                            <a className='pdf-title' href={`../../../public/uploads/pdf/${data.pdfUrl}`} rel="noopener noreferrer">{data.title}.pdf</a>
                                        </p>
                                    </div>
                                </div>
                                <div className='one-line'>
                                    <div>
                                        <img src={vedio} className='coloum-icon' />
                                    </div>
                                    <div className='same-line'>
                                        <Link to={`/player/${data.id}`} target='blank'>
                                            <p className='coloum-para'>
                                                <a className='video-title'>{data.title} video.mp4</a>
                                            </p>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default singleLanguage