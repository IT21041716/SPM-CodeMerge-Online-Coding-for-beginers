import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './common.css'
import java from '../../assets/IT21041716/R.jpeg'
import pdf from '../../assets/IT21041716/pdf.jpeg'
import vedio from '../../assets/IT21041716/vedio.jpeg'
import DashHeader from '../componants/DashHeader'
import { Box } from "@mui/material";
import { getAllMaterial } from '../actions/materialAction'

const Java = () => {

    const dispatch = useDispatch();
    const allMaterial = useSelector((state) => state.material.allMaterial)
    console.log(allMaterial)
    const language = "Java"

    useEffect(() => {
        dispatch(getAllMaterial(language));
    }, [])

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${java})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '400px',
                    backgroundPosition: 'center center',
                    filter: 'brightness(50%)',

                }}
            />

            <Box display='flex' justifyContent="space-between" alignItems="center" position="relative" zIndex='1' marginTop='-100px' paddingLeft='100px'>
                <DashHeader title='Java Language' subtitle='Welcome to CodeFest java lessons' />
            </Box>
            <div style={{ marginTop: '5rem', textAlign: 'center', marginBottom: '5rem' }}>
                <h1 style={{ fontWeight: 'bold' }}>Java Tutorials For Beginners</h1>
            </div>
            <div style={{ marginBottom: '30%' }}>
                {
                    allMaterial.map((data, index) => (
                        <div className='main-container'>
                            <div className='container-heading'>
                                <h2>{data.number}. {data.title}</h2>
                            </div>
                            <div>
                                <div className='one-line'>
                                    <div>
                                        <img src={pdf} className='coloum-icon' />
                                    </div>
                                    <div className='same-line'>
                                        {/* <p className='coloum-para'>Introduction to java.pdf</p> */}
                                        <p className='coloum-para'>
                                            <a href={`../../../public/uploads/pdf/${data.pdfUrl}`} rel="noopener noreferrer">{data.title}.pdf</a>
                                        </p>
                                    </div>
                                </div>
                                <div className='one-line'>
                                    <div>
                                        <img src={vedio} className='coloum-icon' />
                                    </div>
                                    <div className='same-line'>

                                        <p className='coloum-para'>
                                            <a href={`../../../public/uploads/vedios/${data.vedioUrl}`} target='blank'>{data.title} video.mp4</a>
                                        </p>
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

export default Java