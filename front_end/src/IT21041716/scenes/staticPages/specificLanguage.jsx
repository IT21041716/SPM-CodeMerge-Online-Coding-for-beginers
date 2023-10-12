import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './slider.css'
import './common.css'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import pdf from '../../../assets/IT21041716/pdf.jpeg'
import vedio from '../../../assets/IT21041716/vedio.jpeg'
import { getAllMaterial } from '../../actions/materialAction'
import { getById } from '../../actions/languageActions'
import bg from '../../../assets/IT21041716/bg.jpg'
import Header from './Header'
import Footer from './footer'
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import staticContent from './data'


const SpecificLanguage = () => {
  const dispatch = useDispatch();
  const allMaterial = useSelector((state) => state.material.allMaterial);
  const loading = useSelector((state) => state.material.loading);
  const oneData = useSelector((state) => state.language.oneData);
  const navigate = useNavigate();

  const id = localStorage.getItem('id');
  const language = oneData.name;

  const [game, setGame] = useState([]);

  const navigateGame = (e) => {
    axios.get(`http://localhost:8080/v1/game/gameTopic/${e}`).then((res) => {
      navigate(`/games/list/${res.data}`);
    }).catch((err) => {
      toast.error('Error in game loading');
    });
  };

  useEffect(() => {
    dispatch(getById(id));
    dispatch(getAllMaterial(language));
  }, [dispatch, id, language]);

  useEffect(() => {
    axios.get('http://localhost:8080/v1/game/gameModuls').then((res) => {
      setGame(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if (loading === true) {
      toast.loading('Loading...', { id: 'loading' });
    } else if (loading === false) {
      toast.dismiss('loading');
    }
  }, [loading]);

  const content = staticContent.find((data) => data.name === language);


  const handleClick = async (data) => {

    const form = {
      user: localStorage.getItem("email"),
      pdfTitle: data.title

    }
    try {
      const res = await axios.post('http://localhost:8080/api/pdfView/insert', form);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleClick2 = async (data) => {

    const form = {
      user: localStorage.getItem("email"),
      videoTitle: data.title

    }
    try {
      const res = await axios.post('http://localhost:8080/api/videoView/insert', form);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <>
      <Header />
      <MDBCarousel>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={1}
          src={oneData.coverImageUrl ? `../../../../public/uploads/LanguageImages/${oneData.coverImageUrl}` : bg}
          alt='cover image '
          style={{ maxHeight: '550px' }}
        >
          <h5>{oneData.pageTitle}</h5>
          <p>{oneData.pageSubTitle}.</p>
        </MDBCarouselItem>
      </MDBCarousel>

      <div className="row animate-box" style={{ marginTop: '3rem' }}>
        <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: "auto", marginRight: 'auto', width: '70%' }}>
          <h2>{oneData.name} Tutorials For Beginners</h2>
        </div>
      </div>
      {content && (
        <>
          <div className="row animate-box" style={{ marginTop: '-3rem' }}>
            <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: "auto", marginRight: 'auto', width: '50%' }}>
              <p style={{ textAlign: 'justify' }}>{content.para1}</p>
            </div>
          </div>
          <div className="row animate-box" style={{ marginTop: '-3rem' }}>
            <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: "auto", marginRight: 'auto', width: '50%' }}>
              <p style={{ textAlign: 'justify' }}>{content.para2}</p>
            </div>
          </div>
          <div className="row animate-box" style={{ marginTop: '-3rem' }}>
            <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: "auto", marginRight: 'auto', width: '50%' }}>
              <h2>{content.heading}</h2>
              <p style={{ textAlign: 'justify' }}>{content.para3}</p>
            </div>
          </div>
          <div className="row animate-box" style={{ marginTop: '-3rem' }}>
            <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: "auto", marginRight: 'auto', width: '50%' }}>
              <h2>{content.heading2}</h2>
              <p style={{ textAlign: 'justify' }}>{content.para4}</p>
            </div>
          </div>
        </>
      )}

      {!content && null}

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
                      <a className='pdf-title' href={`../../../../public/uploads/pdf/${data.pdfUrl}`} onClick={() => handleClick(data)} target='_blank' rel="noopener noreferrer">{data.title}.pdf</a>
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
                        <p className='video-title' onClick={() => handleClick2(data)}>{data.title} video.mp4</p>
                      </p>
                    </Link>
                  </div>
                </div>
                <div className='one-line'>
                  {game.map(ga => (
                    ga == data.title ?
                      <div>
                        <div>

                        </div>
                        <div className='same-line'>
                          {/* <Link to={`/games/list/${ga}`} >
                                            Play Game
                                        </Link> */}
                          <button onClick={() => navigateGame(ga)} className="btn btn-primary btn-sm btn-course">Play Game</button>
                        </div>
                      </div> : null
                  ))}
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <section className="sliderNew">
        <div className="slide-trackNew">
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/asp.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/c.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/c++.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/csharp.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/css.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/html.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/java.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/js.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/node.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/php.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/react.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/python.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/asp.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/c.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/c++.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/csharp.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/css.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/html.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/java.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/js.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/node.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/php.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/react.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="slideNew">
            <img class="img-fluid" src="../../../../public/images/python.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default SpecificLanguage