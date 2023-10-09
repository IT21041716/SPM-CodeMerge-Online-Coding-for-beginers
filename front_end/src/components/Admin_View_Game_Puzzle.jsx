import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from "mdb-react-ui-kit";
import axios from "axios";
import { Styles } from "./Add_Game_Puzzle";
import { Modal } from "react-bootstrap";

export default function AdminViewGamePuzzle() {
  const [showModal, setShowModal] = useState(false);
  const [oneGame,setOneGame] = useState([]);
  const [qeustion,setQuestion] = useState("");
  const [texts,setTexts] = useState([]);
  const [codeNo, setCodeNo] = useState(0);
  const [gameText, setGameTexts] = useState([]);
  const [gameID,setGameID]=("");
  const [gameModuleName, setGameModuleName] = useState("");
  const [gameModuleTopic, setGameModuleTopic] = useState("");
  

  const Style = {
    tableStyle: {
      width: "90%",
      textAlign:'justify',
      margin:'0 auto',
      border:'2px solid black',
      borderRadius:'10px'
    },
  };

  const handleShowModal = (e) => {
    setShowModal(true);
    axios.get(`http://localhost:8080/v1/game/view/${e}`).then((res)=>{
      setOneGame(res.data);
      setQuestion(res.data.question);
      setTexts(res.data.texts);
      setGameID(res.data.gameId);
      setGameModuleName(res.data.gameModuleName);
      setGameModuleTopic(res.data.gameModuleTopic);
    }).catch((err)=>{
      console.log(err);
    })
  
  };
  const handleCloseModal = () => setShowModal(false);

  const [games,setGame]= useState([]);
 

  const updateGame = (e) => {
    const form = new FormData();

    form.append("gameModule", gameModuleName);
    form.append("GMTopic", gameModuleTopic);
    form.append("text", gameText);
    form.append("question", qeustion);
    console.log(form)
    axios.put(`http://localhost:8080/v1/game/update/${e}`,form).then(()=>{
      console.log("success");
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    axios.get('http://localhost:8080/v1/game/all').then((res) => {
        setGame(res.data);
    }).catch((err) => {
        console.log(err);
    })
  },[])

  console.log(gameModuleName);
  console.log(gameModuleTopic);
  console.log(gameText);
  console.log(qeustion);

  return (
    <div style={Styles.bodyStyle}>
      <br></br>
    <div style={Styles.secondDiv}>
      <br></br>
      <h2 style={Styles.mainText}>Games Management</h2>
      <hr style={Styles.hrStyle}/>
      <br/>
      <MDBTable align="middle" style={Style.tableStyle}>
        <MDBTableHead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Module Name</th>
            <th scope="col">Module Topic</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          
            {games.map(game=>(
                <tr key={game.gameId}>
                <td>
              <div className="d-flex align-items-center">
                <p className="fw-normal mb-1">{game.question}</p>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">{game.gameModuleName}</p>
            </td>
            <td>
            <p className="fw-normal mb-1">{game.gameModuleTopic}</p>
            </td>
            <td>
              <MDBBtn color="info" rounded size="sm" onClick={()=> handleShowModal(game.gameId)}>
                Edit
              </MDBBtn>
              <MDBBtn color="danger" rounded size="sm">
                Delete
              </MDBBtn>
            </td>
               </tr>
            ))}
          
        </MDBTableBody>
      </MDBTable>
      <br/>
      </div>
      <br/>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={() => updateGame(gameID)}>
          <div className="row">
            <div className="col-3">
              Module Name -
            </div>
            <div className="col-9">
              <input type="text" value={oneGame.gameModuleName} onChange={()=>setGameModuleName(oneGame.gameModuleName)}/>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              Module Topic -
            </div>
            <div className="col-9">
              <input type="text" value={oneGame.gameModuleTopic} onChange={()=>setGameModuleTopic(oneGame.gameModuleTopic)}/>
            </div>
          </div>
          <div className="row">
            <div className="col-3">Question - </div>
            <div className="col-9">
              <textarea rows={5} cols={40} value={qeustion} onChange={(e)=>setQuestion(e.target.value)}/>
            </div>
          </div>
          <div className="row">
              <div className="col-3">No od Codes - </div>
              <div className="col-9">
               <input type="number" onChange={(e)=>setCodeNo(e.target.value)}/>
              </div>
          </div>
          <div className="row">
              <div className="col-3">Code - </div>
              <div className="col-9">
              {Array.from({ length: codeNo }).map((_, index) => (
                       
                          <input type="text"  onChange={(e) => {
                                const newTexts = [...gameText];
                                newTexts[index] = e.target.value;
                                setGameTexts(newTexts);
                              }}/>
                         
                      
                       
                    ))}
              </div>
          </div> <br/><br/>
          <div className="row">
            <div className="col">
              <button className="btn btn-dark">Update</button>
            </div>
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <MDBBtn
            outline
            rounded
            className="mx-2"
            color="danger"
            onClick={handleCloseModal}
          >
            Close
          </MDBBtn>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
