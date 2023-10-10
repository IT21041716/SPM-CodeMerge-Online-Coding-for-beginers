import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";

export default function AddGamePluzzle() {
  const [gameModuleName, setGameModuleName] = useState("");
  const [gameModuleTopic, setGameModuleTopic] = useState("");
  const [gameText, setGameTexts] = useState([]);
  const [question, setQuestion] = useState("");
  const [codeNo, setCodeNo] = useState(0);

  const display = () => {
    console.log(gameModuleName);
    console.log(gameModuleTopic);
  };

  const addGame = (e) => {
    console.log("Hello wellcome how are you");
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
