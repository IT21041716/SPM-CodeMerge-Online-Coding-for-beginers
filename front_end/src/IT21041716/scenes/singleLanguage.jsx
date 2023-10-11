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
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const singleLanguage = () => {

    const dispatch = useDispatch();
    const useparams = useParams();
    const allMaterial = useSelector((state) => state.material.allMaterial)
    const loading = useSelector((state) => state.material.loading)
    const oneData = useSelector((state) => state.language.oneData)
    const id = useparams.id;
    const language = oneData.name;
    const navigate = useNavigate();

    //sajindu
    const [game,setGame] =useState([]);

    const navigateGame = (e) => {
        console.log(e)
        axios.get(`http://localhost:8080/v1/game/gameTopic/${e}`).then((res)=>{
            console.log(res)
            navigate(`/games/list/${res.data}`);
        }).catch((err)=>{
            toast.error('Error in game loading')
        })
    }

    console.log(game);

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id]);

    //sajindu
    useEffect(()=>{
        axios.get('http://localhost:8080/v1/game/gameModuls').then((res) => {
            setGame(res.data);
            console.log(res.data)
        }).catch((err) => {
            console.log(err);
        })
      },[])


    useEffect(() => {
        dispatch(getAllMaterial(language));
    }, [dispatch, language]);


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
                                <h2>{index + 1}.{data.title}</h2>
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
                                <div className='one-line'>
                                    <div>
                                        <img src={vedio} className='coloum-icon' />
                                    </div>
                                    <div className='same-line'>
                                        <Link to={`/player/${data.id}`} target='blank'>
                                            <p className='coloum-para'>
                                                <a className='video-title'>Hi</a>
                                            </p>
                                        </Link>
                                    </div>
                                    
                                    
                                </div>
                                <div className='one-line'>
                                    {game.map(ga=>(
                                        ga == data.title ?
                                        <div>
                                    <div>
                                        
                                    </div>
                                    <div className='same-line'>
                                        {/* <Link to={`/games/list/${ga}`} >
                                            Play Game
                                        </Link> */}
                                        <button onClick={()=>navigateGame(ga)}>Play Game</button>
                                    </div>
                                    </div>:null
                                    ))}
                                    
                                    
                                    
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