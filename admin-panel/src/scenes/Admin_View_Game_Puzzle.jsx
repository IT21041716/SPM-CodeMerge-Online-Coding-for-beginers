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
import toast from "react-hot-toast";
import logo from '../assets/IT21041716/logo2.png'
import { Link } from "react-router-dom";

export default function AdminViewGamePuzzle() {
  const [showModal, setShowModal] = useState(false);
  const [oneGame,setOneGame] = useState([]);
  const [qeustion,setQuestion] = useState("");
  const [texts,setTexts] = useState([]);
  const [codeNo, setCodeNo] = useState(0);
  const [gameText, setGameTexts] = useState([]);
  const [gameID,setGameID]= useState("");
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
    console.log(e)
    axios.get(`http://localhost:8080/v1/game/view/${e}`).then((res)=>{
      setOneGame(res.data);
      setQuestion(res.data.question);
      setTexts(res.data.texts);
      setGameID(res.data.gameId);
      setGameModuleName(res.data.gameModuleName);
      setGameModuleTopic(res.data.gameModuleTopic);
      console.log(res.data)
    }).then(()=>{

      setShowModal(true);
    }).catch((err)=>{
      console.log(err);
    })
  };
  const handleCloseModal = () => setShowModal(false);

  const [games,setGame]= useState([]);
 

  const updateGame = (e) => {
    console.log(e)
    if(gameModuleName == ""){
      toast.error('Please enter the game module name')
    }else if(gameModuleTopic == ""){
      toast.error('Please enter the game module topic')
    }else if(gameText == ""){
      toast.error('Please enter the game answers')
    }else if(qeustion == ""){
      toast.error('Please enter the question')
    }else if(gameModuleName != "" && gameText != "" && qeustion != "" && gameModuleTopic != ""){
      const form = new FormData();
    console.log(e)
    form.append("gameModule", gameModuleName);
    form.append("GMTopic", gameModuleTopic);
    form.append("text", gameText);
    form.append("question", qeustion);
    console.log(form)
    axios.put(`http://localhost:8080/v1/game/update/${e}`,form).then(()=>{
      toast.success('Game Updated!')
    }).catch((err)=>{
      console.log(err);
    })
    }
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
  console.log(gameID);

  const deleteGame = (e) => {
    console.log('Hi')
    var result = window.confirm("Are you sure, you want to delete this game ?");
    if(result == true){
      axios.delete(`http://localhost:8080/v1/game/delete/${e}`).then(()=>{
        toast.success('Game Deleted!');
      }).catch((err)=>{
        toast.error('Error in game deleting!')
      })
    }
  }
  const logout = () => {
    dispatch(signout());
};
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
                                        <span className="hide-menu">Games Center</span>
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
    <div style={{marginLeft:'300px'}}>
    <div style={Styles.bodyStyle}>
      <br></br>
    <div style={Styles.secondDiv}>
      <br></br>
      <h2 style={Styles.mainText}>Games Management</h2>
      <hr style={Styles.hrStyle}/>
      <br/>
      <div>
        <Link to={'/game/add'}>
        <button className="btn btn-dark" style={{marginLeft:'800px'}}>Add</button>
        </Link>
      </div>
      <br></br>
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
              
              <button className="btn btn-danger" onClick={()=> deleteGame(game.gameId)}>Delete</button>
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
              <button className="btn btn-dark" type="submit">Update</button>
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
    </div>
    </div>
  );
}
