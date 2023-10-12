import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './footer'
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast'
import { getAll } from '../../actions/languageActions';
import { Link } from 'react-router-dom';
import './slider.css'
import slide from '../../../assets/IT21041716/slide.jpg'
import image from '../../../assets/IT21041716/image.jpg'





const learning = () => {
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

  const navigate = (id) => {
    localStorage.setItem("id", id)
    window.location.href = "/content"
  }

  return (
    <>
      <Header />
      <MDBCarousel>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={1}
          src={slide}
          alt='slider image 1'
          style={{ maxHeight: '550px' }}
        >
          <h5>Unlock Your Potential</h5>
          <p>Explore the world of coding and turn your ideas into reality.</p>
        </MDBCarouselItem>
      </MDBCarousel>

      <div className="row animate-box" style={{ marginTop: '3rem' }}>
        <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: "auto", marginRight: 'auto', width: '70%' }}>
          <h2>The Art of Coding</h2>
          <p style={{ textAlign: 'justify' }}>Learning to code is like embarking on a captivating journey through the digital realm, a journey that can transform your ability to create beautiful and functional webpages. With the multitude of coding languages available at your fingertips, you have the power to craft exquisite, dynamic web content that captures the imagination and leaves a lasting impression.</p>
        </div>
      </div>

      <div id="page">
        <div id="fh5co-about">
          <div className="container">
            <div className="row">
              <div className="col-md-6 animate-box">
                <span>CodeFest learning nexues</span>
                <h2>Advantages of Learning to Code</h2>
                <ul>
                  <li style={{ fontSize: '14px' }}>Unleash limitless creative freedom to design and shape webpages with precision and artistry.</li>
                  <li style={{ fontSize: '14px' }}>Master various programming languages like HTML, CSS, and JavaScript to enrich your toolkit.</li>
                  <li style={{ fontSize: '14px' }}>Empower personal and professional growth with the capacity to take on exciting challenges.</li>
                  <li style={{ fontSize: '14px' }}>Develop web applications, design responsive layouts, and optimize webpages for peak performance.</li>
                  <li style={{ fontSize: '14px' }}>Stay at the cutting edge of innovation in the ever-evolving world of technology and web development.</li>
                </ul>
              </div>
              <div className="col-md-6 animate-box">
                <img src={image} alt="Image Description" style={{ height: '400px', width: '600px', borderRadius: '7%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row animate-box">
        <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: "auto", marginRight: 'auto', width: '70%' }}>
          <h2>Challenges of Learning to Code</h2>
          <ul>
            <li style={{ textAlign: 'justify' }}>Face a steep learning curve and potential frustration along the way.</li>
            <li style={{ textAlign: 'justify' }}>Overcome challenges such as debugging code, handling compatibility issues, and understanding complex algorithms.</li>
          </ul>
          <p style={{ textAlign: 'justify' }}>In your quest to make your webpages beautiful, using paragraphs, bullets, and other formatting techniques is key. Well-structured content ensures that your message is conveyed effectively. Paragraphs create a rhythm to your content, making it easy to read, while bullets help you highlight key points, making your content visually appealing and easily scannable.</p>

          <p style={{ textAlign: 'justify' }}>In conclusion, the art of coding is a powerful tool for crafting stunning web content. With dedication and practice, you can harness the advantages of coding to propel your skills to new heights, enabling you to create webpages that not only look beautiful but also function seamlessly. Embrace the challenges, for they are the stepping stones to your growth as a web developer, and use the versatile formatting tools like paragraphs and bullets to present your content in the most engaging and visually pleasing manner. Your coding journey is an odyssey of creativity and innovation, and the possibilities are boundless.</p>
        </div>
      </div>

      <div id="fh5co-course">
        <div className="container">
          <div className="row animate-box">
            <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <h2>Explore Our Learning Materials</h2>
              <p>Discover a world of knowledge and skills through our diverse range of courses. From web development to data science, we offer content that empower you to excel in your chosen field. Join us on a learning journey that will expand your horizons and open new opportunities.</p>
            </div>
          </div>
          <div className="row">

            {
              languages.map((data, index) => (
                <div className="col-md-6 animate-box" key={index}>
                  <div className="course">
                    <div className="course-img" style={{ backgroundImage: `url(../../../../public/uploads/LanguageImages/${data.imageUrl})` }}>
                    </div>
                    <div className="desc">
                      <h3><a href="#">{data.name}</a></h3>
                      <p>{data.description}.</p>
                      <span><button onClick={() => navigate(data.id)} className="btn btn-primary btn-sm btn-course">Learn</button></span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
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

export default learning