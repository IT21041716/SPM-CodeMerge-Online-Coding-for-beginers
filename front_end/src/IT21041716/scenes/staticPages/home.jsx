import React from 'react'
import Header from './Header'
import Footer from './footer'
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';
import slide1 from '../../../../public/images/slider1.jpg'
import slide2 from '../../../../public/images/slider2.jpg'
import slide3 from '../../../../public/images/slider3.jpg'
import html from '../../../../public/images/html.png'
import java from '../../../../public/images/java.png'
import c from '../../../../public/images/c.png'
import cplus from '../../../../public/images/c++.png'
import css from '../../../../public/images/css.png'
import node from '../../../../public/images/node.png'
import react from '../../../../public/images/react.png'
import php from '../../../../public/images/php.png'
import python from '../../../../public/images/python.png'
import js from '../../../../public/images/js.png'
import net from '../../../../public/images/asp.png'
import csharp from '../../../../public/images/csharp.png'



const home = () => {
    return (
        <div>
            <div id="page">
                <Header />
                <MDBCarousel showIndicators showControls fade >
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={1}
                        src={slide1}
                        alt='slider image 1'
                        style={{ maxHeight: '650px' }}
                    >
                        <h5>Unlock Your Potential</h5>
                        <p>Explore the world of coding and turn your ideas into reality.</p>
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={2}
                        src={slide2}
                        alt='slider image 2'
                        style={{ maxHeight: '650px' }}
                    >
                        <h5>Learn the Basics</h5>
                        <p>We help you learning new thing.</p>
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={slide3}
                        alt='slider image 3'
                        style={{ maxHeight: '650px' }}
                    >
                        <h5>Join Our Community</h5>
                        <p>Join our coding community and embark on a journey of discovery.</p>
                    </MDBCarouselItem>
                </MDBCarousel>


                <div id="fh5co-course-categories">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: "auto", marginRight: 'auto', width: '70%' }}>
                                <h2>Programming Languages</h2>
                                <p style={{ textAlign: 'justify' }}>Learning computer programming offers a multitude of benefits. Firstly, it empowers individuals with problem-solving skills, allowing them to break complex challenges into manageable steps, a valuable skill applicable in various life domains.
                                    Additionally, programming fosters creativity by enabling people to bring their ideas to life through software and digital solutions. In the professional realm, programming skills are in high demand, opening up numerous career opportunities
                                    and ensuring job security in our technology-driven world. Moreover, programming enhances logical thinking and attention to detail, crucial attributes for both programmers and non-programmers alike. Lastly, it encourages a growth mindset, as
                                    coding often involves trial and error, teaching perseverance and resilience in the face of obstacles. Overall, computer programming equips individuals with a powerful set of tools and abilities that extend far beyond the realm of technology.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={java} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-shop"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">Java</a></h3>
                                        <p>A versatile, object-oriented language known for cross-platform app development, powering everything from mobile apps to enterprise systems.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={c} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-heart4"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">C</a></h3>
                                        <p>A foundational, low-level language commonly used for system-level programming and software development.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={cplus} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-banknote"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">C++</a></h3>
                                        <p>Building upon C, C++ adds object-oriented features, offering powerful capabilities for software development.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={python} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-lab2"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">Python</a></h3>
                                        <p>Renowned for readability and versatility, Python excels in web, data science, and automation tasks.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={js} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-photo"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">Javascript</a></h3>
                                        <p>JavaScript empowers interactive web experiences, running in browsers, and enabling dynamic content.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={html} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-home-outline"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">Html</a></h3>
                                        <p> HTML structures web content, defining how information appears and interacts on web pages.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={css} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-bubble3"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">CSS</a></h3>
                                        <p>CSS styles HTML content, controlling layout, design, and visual presentation on websites.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={node} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-world"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">Node</a></h3>
                                        <p>Node.js extends JavaScript to the server, ideal for scalable web applications and real-time data processing.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={react} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-world"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">React</a></h3>
                                        <p>A JavaScript library for creating efficient, responsive user interfaces in web applications.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={csharp} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-world"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">C#</a></h3>
                                        <p>C# is versatile, applied in Windows development, game design, and web application creation.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={net} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-world"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">.Net</a></h3>
                                        <p>A comprehensive framework for developing Windows applications and web services efficiently.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 text-center animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <img src={php} className="icon-shop" style={{ width: '100%', height: '100%' }} />
                                        {/* <i className="icon-world"></i> */}
                                    </span>
                                    <div className="desc">
                                        <h3><a href="#">PHP</a></h3>
                                        <p>PHP, a server-side scripting language, excels in building dynamic web applications.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="fh5co-course">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-6 col-md-offset-3 text-center fh5co-heading" style={{ marginLeft: "auto", marginRight: 'auto' }}>
                                <h2>Key Features</h2>
                                <p>Explore our platform's key features, offering a rich repository of learning materials, a convenient coding compiler, a supportive community, and interactive coding games. Elevate your programming journey with us today.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 animate-box">
                                <div className="course">
                                    <a href="/learning" className="course-img" style={{ backgroundImage: "url(images/materials.png)" }}>
                                    </a>
                                    <div className="desc">
                                        <h3><a href="#">Learning Repository</a></h3>
                                        <p>Delve into our expansive learning repository, teeming with educational resources and comprehensive courses designed to propel your coding skills to new heights.</p>
                                        <span><a href="/learning" className="btn btn-primary btn-sm btn-course">Try it</a></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 animate-box">
                                <div className="course">
                                    <a href="#" className="course-img" style={{ backgroundImage: "url(images/qa.jpeg)" }} >
                                    </a>
                                    <div className="desc">
                                        <h3><a href="#">Community Support</a></h3>
                                        <p>Become part of our thriving learner community, where you'll discover guidance, invaluable insights, and collaborative opportunities. Together, we overcome coding challenges and freely exchange knowledge.</p>
                                        <span><a href="#" className="btn btn-primary btn-sm btn-course">Try it</a></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 animate-box">
                                <div className="course">
                                    <a href="#" className="course-img" style={{ backgroundImage: "url(images/compiler.jpeg)" }}>
                                    </a>
                                    <div className="desc">
                                        <h3><a href="#">Compiler</a></h3>
                                        <p>Experience the might of our coding playground—a potent tool for testing, debugging, and refining your coding prowess. Navigate the intricacies of programming with confidence using our user-friendly compiler.</p>
                                        <span><a href="#" className="btn btn-primary btn-sm btn-course">Try it</a></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 animate-box">
                                <div className="course">
                                    <a href="#" className="course-img" style={{ backgroundImage: "url(images/coding.png)" }}>
                                    </a>
                                    <div className="desc">
                                        <h3><a href="#">ProgrammingGames</a></h3>
                                        <p>Unlock the magic of learning through play. Immerse yourself in interactive coding challenges that infuse fun into skill-building. Embark on a dynamic and enjoyable journey of coding mastery.</p>
                                        <span><a href="#" className="btn btn-primary btn-sm btn-course">Try it</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            <div className="gototop js-top">
                <a href="#" className="js-gotop"><i className="icon-arrow-up"></i></a>
            </div>
        </div>

    )
}

export default home