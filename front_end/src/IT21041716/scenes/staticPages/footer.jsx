import React from 'react'
import logo from '../../../../public/logo2.png'


const footer = () => {
    return (
        <div>
            <footer id="fh5co-footer" role="contentinfo" style={{ backgroundImage: "url(images/footer.jpeg)" }}>
                <div className="container">
                    <div className="row row-pb-md">
                        <div className="col-md-3 fh5co-widget">
                            <h3>About Education</h3>
                            <p>Educational empowerment is the key to unlocking a world of opportunities and personal growth. Discover a journey of knowledge and skills on our platform.</p>
                        </div>
                        <div className="col-md-2 col-sm-4 col-xs-6 col-md-push-1 fh5co-widget">
                            <h3>Learning</h3>
                            <ul className="fh5co-footer-links">
                                <li><a href="#">Java</a></li>
                                <li><a href="#">Python</a></li>
                                <li><a href="#">Html</a></li>
                                <li><a href="#">React</a></li>
                                <li><a href="#">Node</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 col-sm-4 col-xs-6 col-md-push-1 fh5co-widget">
                            <h3>Learn &amp; Grow</h3>
                            <ul className="fh5co-footer-links">
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Community</a></li>
                                <li><a href="#">Compiler</a></li>
                                <li><a href="#">Games</a></li>
                                <li><a href="#">Help Desk</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 col-sm-4 col-xs-6 col-md-push-1 fh5co-widget">
                            <h3>Engage us</h3>
                            <ul className="fh5co-footer-links">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Contact us</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 col-sm-4 col-xs-6 col-md-push-1 fh5co-widget">
                            <div><a href="/"><img src={logo} style={{ width: '300px', height: '120px' }} /></a></div>
                        </div>
                    </div>

                    <div className="row copyright">
                        <div className="col-md-12 text-center">
                            <p>
                                <small className="block">&copy; 2023 CodeFest. All Rights Reserved.</small>
                            </p>
                        </div>
                    </div>

                </div>
            </footer>

        </div>
    )
}

export default footer