import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import logo from '../assets/IT21041716/logo2.png'

export default function AddGamePluzzle() {
  const [gameModuleName, setGameModuleName] = useState("");
  const [gameModuleTopic, setGameModuleTopic] = useState("");
  const [gameText, setGameTexts] = useState([]);
  const [question, setQuestion] = useState("");
  const [codeNo, setCodeNo] = useState(0);

  const logout = () => {
    dispatch(signout());
};

  const display = () => {
    console.log(gameModuleName);
    console.log(gameModuleTopic);
  };

  const addGame = (e) => {
    if (gameModuleName === "") {
      console.log("game module name missing");
    } else if (gameModuleTopic === "") {
      console.log("game module topic missing");
    } else if (gameModuleName !== "" && gameModuleTopic !== "") {
      const form = new FormData();

      // gameImages.forEach((gImage) => {
      //   form.append("files", gImage);
      // });
      //form.append("files", gameImages);

      form.append("gameModule", gameModuleName);
      form.append("GMTopic", gameModuleTopic);
      form.append("text", gameText);
      form.append("question", question);
      console.log(form);
      axios
        .post("http://localhost:8080/v1/game/add", form)
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.error(err);
        });
      setGameID("");
      setGameModuleName("");
      setGameModuleTopic("");
    }
  };

  console.log(gameText);
  return (
    <div>
      <aside className="left-sidebar">
                    {/* <!-- Sidebar scroll--> */}
                    <div>
                        <div className="brand-logo d-flex align-items-center justify-content-between">
                            <a href="/" className="text-nowrap logo-img">
                                <img src={logo} width="180" alt="" style={{ marginTop: '2rem' }} />
                            </a>
                            <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                                <i className="ti ti-x fs-8"></i>
                            </div>
                        </div>
                        {/* <!-- Sidebar navigation--> */}
                        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                            <ul id="sidebarnav">
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                    <span className="hide-menu" >Home</span>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-layout-dashboard"></i>
                                        </span>
                                        <span className="hide-menu">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                    <span className="hide-menu">COMPONENTS</span>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/languages" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-article"></i>
                                        </span>
                                        <span className="hide-menu">Languages</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/newLanguage" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-alert-circle"></i>
                                        </span>
                                        <span className="hide-menu">Add New Language</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/game/view" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-cards"></i>
                                        </span>
                                        <span className="hide-menu">Game Center</span>
                                    </a>
                                </li>
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                    <span className="hide-menu">ACTIONS</span>
                                </li>
                                <li className="sidebar-item">
                                    <button onClick={logout} className="sidebar-link" href="./authentication-login.html" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-login"></i>
                                        </span>
                                        <span className="hide-menu">Logout</span>
                                    </button>
                                </li>
                            </ul>
                            <div >

                            </div>
                        </nav>
                        {/* <!-- End Sidebar navigation --> */}
                    </div>
                    {/* <!-- End Sidebar scroll--> */}
                </aside>
    <div style={{paddingLeft:'300px'}}>           
    <div style={Styles.bodyStyle}>
      <br />
      <div style={Styles.secondDiv}>
        <br />
        <h1 style={Styles.mainText}>Add New Game</h1>
        <hr style={Styles.hrStyle}/>
        <br/>
        <div className="container" style={Styles.formBody}>
          <br></br>
          <Form style={Styles.formStyle} onSubmit={addGame}>
            <br />
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Module Name
              </Form.Label>
              <Col sm={9}>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setGameModuleName(e.target.value);
                  }}
                >
                  <option>Open this select menu</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="Java Script">Java Script</option>
                </Form.Select>
              </Col>
            </Form.Group>

            {gameModuleName == "" ? (
              <span style={Styles.spanText}>
                Please complete the box above and proceed
              </span>
            ) : gameModuleName == "Java" ? (
              <div>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Module Topic
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => {
                        setGameModuleTopic(e.target.value);
                      }}
                    >
                      <option>Open this select menu</option>
                      <option value="Introduction to Java">
                        Introduction to Java
                      </option>
                      <option value="Object Orientation Concepts">
                        Object Orientation Concepts
                      </option>
                      <option value="Java classes">Java classes</option>
                      <option value="Exception Handling">
                        Exception Handling
                      </option>
                      <option value="Strings">Strings</option>
                      <option value="Collections">Collections</option>
                      <option value="Generics">Generics</option>
                      <option value="Threads">Threads</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Question
                  </Form.Label>
                  <Col sm={9}>
                    <textarea
                      rows={5}
                      cols={43}
                      required
                      name="1"
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Number of code line
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      required
                      name="1"
                      onChange={(e) => setCodeNo(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={3}>
                    Code Line
                  </Form.Label>
                  <Col sm={9}>
                    {Array.from({ length: codeNo }).map((_, index) => (
                      <div key={index}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formHorizontalEmail"
                        >
                          <Form.Label column sm={1}>
                            #{++index}
                          </Form.Label>
                          <Col sm={11}>
                            <Form.Control
                              type="text"
                              required
                              name="1"
                              onChange={(e) => {
                                const newTexts = [...gameText];
                                newTexts[index] = e.target.value;
                                setGameTexts(newTexts);
                              }}
                            />
                          </Col>
                          <br />
                        </Form.Group>
                      </div>
                    ))}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col >
                    <Button
                      type="submit"
                      className="btn btn-dark"
                    >
                      Add
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            ) : gameModuleName == "Python" ? (
              <div>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Module Topic
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => {
                        setGameModuleTopic(e.target.value);
                      }}
                    >
                      <option>Open this select menu</option>
                      <option value="Introduction to Python">
                        Introduction to Python
                      </option>
                      <option value="Basic Syntax and Variables">
                        Basic Syntax and Variables
                      </option>
                      <option value="Control Structures">
                        Control Structures
                      </option>
                      <option value="Functions">Functions</option>
                      <option value="File Handling">File Handling</option>
                      <option value="Exception Handling">
                        Exception Handling
                      </option>
                      <option value="Standard Library">Standard Library</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Question
                  </Form.Label>
                  <Col sm={9}>
                    <textarea
                      rows={5}
                      cols={43}
                      required
                      name="1"
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Number of code line
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      required
                      name="1"
                      onChange={(e) => setCodeNo(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={3}>
                    Code Line
                  </Form.Label>
                  <Col sm={9}>
                    {Array.from({ length: codeNo }).map((_, index) => (
                      <div key={index}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formHorizontalEmail"
                        >
                          <Form.Label column sm={1}>
                            #{++index}
                          </Form.Label>
                          <Col sm={11}>
                            <Form.Control
                              type="text"
                              required
                              name="1"
                              onChange={(e) => {
                                const newTexts = [...gameText];
                                newTexts[index] = e.target.value;
                                setGameTexts(newTexts);
                              }}
                            />
                          </Col>
                          <br />
                        </Form.Group>
                      </div>
                    ))}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col>
                    <Button
                      type="submit"
                      className="btn btn-dark"
                    >
                      Add
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            ) : gameModuleName == "Java Script" ? (
              <div>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Module Topic
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => {
                        setGameModuleTopic(e.target.value);
                      }}
                    >
                      <option>Open this select menu</option>
                      <option value="Introduction to Java Script">
                        Introduction to Java Script
                      </option>
                      <option value="Basic Syntax and Variables">
                        Basic Syntax and Variables
                      </option>
                      <option value="Control Structure">
                        Control Structures
                      </option>
                      <option value="Data Structures">Data Structures</option>
                      <option value="Functions">Functions</option>
                      <option value="Closures">Closures</option>
                      <option value="Callbacks and Promises">
                        Callbacks and Promises
                      </option>
                      <option value="Async/Await">Async/Await</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Question
                  </Form.Label>
                  <Col sm={9}>
                    <textarea
                      rows={5}
                      cols={43}
                      required
                      name="1"
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Number of code line
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      required
                      name="1"
                      onChange={(e) => setCodeNo(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={3}>
                    Code Line
                  </Form.Label>
                  <Col sm={9}>
                    {Array.from({ length: codeNo }).map((_, index) => (
                      <div key={index}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formHorizontalEmail"
                        >
                          <Form.Label column sm={1}>
                            #{++index}
                          </Form.Label>
                          <Col sm={11}>
                            <Form.Control
                              type="text"
                              required
                              name="1"
                              onChange={(e) => {
                                const newTexts = [...gameText];
                                newTexts[index] = e.target.value;
                                setGameTexts(newTexts);
                              }}
                            />
                          </Col>
                          <br />
                        </Form.Group>
                      </div>
                    ))}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col>
                    <Button
                      type="submit"
                      className="btn btn-dark"
                    >
                      Add
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            ) : null}
          </Form>
          <br/>
        </div>
        <br/>
      </div>
      <br/>
    </div>
    </div> 
    </div>
  );
}

export const Styles = {
  bodyStyle: {
    backgroundColor: "black",
    height: "auto",
  },
  secondDiv: {
    backgroundColor: "whitesmoke",
    width: "90%",
    margin: "0 auto",
    borderRadius: "20px",
    height: "auto",
  },
  formBody: {
    width: "60%",
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "10px",
    fontFamily:'Lucida Console'
  },
  formStyle: {
    width: "90%",
    margin: "0 auto",
  },
  spanText: {
    fontSize: "small",
    color: "gray",
  },
  mainText: {
    color: "black",
    textAlign: "center",
    fontFamily:'Fantasy'
  },
  hrStyle: {
    borderWidth: "3px",
    width: "10%",
    margin: "0 auto",
    borderRadius: "5px",
  },
};
