import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import { getByID } from '../actions/materialAction'
import './common.css'

const vedioPlayer = () => {
    const useparams = useParams();
    const dispatch = useDispatch();
    const id = useparams.id;

    useEffect(() => {
        dispatch(getByID(id))
    }, [])

    const data = useSelector(state => state.material.oneData)


    return (
        <>
            <div className="vedio-title">
                <p>{data.title}</p>
            </div>
            <div className="vedio-player-main-container">
                <div className="inner-container">
                    <ReactPlayer
                        url={`../../../public/uploads/vedios/${data.vedioUrl}`}
                        controls={true}
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </>

    )
}

export default vedioPlayer