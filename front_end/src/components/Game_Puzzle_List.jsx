import "bootstrap/dist/css/bootstrap.min.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { SortableItems } from "./Game_Puzzle";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AdjustIcon from "@mui/icons-material/Adjust";
import { MDBBtn } from "mdb-react-ui-kit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function Game_Puzzle_List() {
  const [gameQuestion, setGameQuestion] = useState("");
  const [GMTopic, setGMTopic] = useState("");
  const [gameModule, setGameModule] = useState("");
  const { id } = useParams();
  const [gameTexts, setGameText] = useState([]);
  const colors = ["red", "blue", "green", "orange"]; // Define your desired colors
  const [currentColorIndex, setCurrentColorIndex] = useState(0); // Initialize to the first color
  const [answer, setAnswer] = useState(false);
  const [borderColor, setBorderColor] = useState("black");
  const [gameResult, setGameResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/game/one/${id}`)
      .then((res) => {
        //console.log(res.data)
        const shuffledArray = shuffleArray(res.data);
        setGameText(shuffledArray);
        console.log(gameTexts)
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });

    axios.get(`http://localhost:8080/v1/game/view/${id}`).then((res) => {
      console.log(res.data);
      setGameQuestion(res.data.question);
      setGameModule(res.data.gameModuleName);
      setGMTopic(res.data.gameModuleTopic);
    });

    const intervalId = setInterval(() => {
      // Increment the current color index, and wrap around to 0 if it reaches the end
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000); // Change color every 2 seconds (2000 milliseconds)

    return () => {
      // Cleanup the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  const currentColor = colors[currentColorIndex]; // Get the current color from the array

  const Style = {
    boduStyle: {
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
    h1text: {
      fontFamily: "Fantasy",
      color: currentColor,
      textAlign: "center",
    },
    hrStyle: {
      borderWidth: "3px",
      width: "10%",
      margin: "0 auto",
      borderRadius: "5px",
    },
    pStyle: {
      fontFamily: "Cambria",
      textStyle: "bold",
      fontSize: "20px",
    },
    questionStyle: {
      textAlign: "justify",
      fontFamily: "Cambria",
      fontSize: "20px",
    },
    iconStyle: {
      fontSize: "30px",
      color: "#B2BABB",
      paddingRight: "5px",
    },
    thirdDiv: {
      width: "83%",
      height: "auto",
      backgroundColor: "white",
      margin: "0 auto",
      border: `2px solid ${borderColor}`,
      padding: "30px",
    },
    runButton: {
      marginLeft: "100px",
    },
    answerStyle: {
      backgroundColor: `${borderColor}`,
      color: "white",
      width: "30%",
      textAlign: "center",
      margin: "0 auto",
      borderTopLeftRadius: "5px",
      borderTopRightRadius: "5px",
    },
  };

  const submitAnswer = (e) => {
    axios
      .post(`http://localhost:8080/v1/game/result/${id}`, gameTexts)
      .then((res) => {
        console.log(res.data);
        setAnswer(res.body);
        if (res.data == true) {
          setBorderColor("blue");
          setGameResult("Correct!");
        } else {
          setBorderColor("red");
          setGameResult("Incorrect, Try again!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i +1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    }
    return newArray;
  }

  const finishGame = (e) => {
    var result = window.confirm("Congralutions!!!, you eran 10 pinots.");
    if(result == true){
      navigate(`/#`);
    }
  }
  const BackGame = (e) => {
    var result = window.confirm("You not complete this game, after compete this game you can eran 10 points, try again !");
    if(result == true){
      navigate(`/#`);
    }
  }

  return (
    <>
      <div style={Style.boduStyle}>
        {" "}
        <br />
        <div style={Style.secondDiv}>
          {" "}
          <br />
          <h1 style={Style.h1text}>Game Zone!</h1>
          <hr style={Style.hrStyle} /> <br />
          <div className="row">
            <div className="col d-flex justify-content-center">
              <AcUnitIcon style={Style.iconStyle} />
              <p style={Style.pStyle}>Module Name - {gameModule}</p>
            </div>
            <div className="col d-flex justify-content-center">
              <AcUnitIcon style={Style.iconStyle} />
              <p style={Style.pStyle}>Topic Name - {GMTopic}</p>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-1 d-flex justify-content-center align-items-center">
              <QuizIcon />
            </div>
            <div className="col-10">
              {" "}
              <p style={Style.questionStyle}>{gameQuestion}</p>
            </div>
          </div>{" "}
          <br />
          <h3 style={Style.answerStyle}>{gameResult}</h3>
          <div style={Style.thirdDiv}>
            <div>
              <p style={{ fontFamily: "Monospace" }}>public class main {"{"}</p>
              <p style={{ fontFamily: "Monospace" }}>
                public static void main(String[] args) {"{"}
              </p>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div>
                  <SortableContext
                    items={gameTexts.map((text, key) => text)}
                    strategy={verticalListSortingStrategy}
                  >
                    {gameTexts.map((text, key) => (
                      <div className="row">
                        {" "}
                        <div className="col-1">
                          <AdjustIcon style={{ color: "#F1C40F" }} />
                        </div>
                        <div className="col">
                          <SortableItems key={text} id={text} />{" "}
                        </div>
                      </div>
                    ))}
                  </SortableContext>

                  {/* {gameTexts.map((text,key)=>text)} */}
                </div>
              </DndContext>
              <p style={{ fontFamily: "Monospace", paddingLeft: "55px" }}>
                {"}"}
              </p>
              <p style={{ fontFamily: "Monospace" }}>{"}"}</p>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-1"></div>
            <div className="col">
              <MDBBtn color="dark" onClick={submitAnswer}>
                <PlayArrowIcon /> run
              </MDBBtn>
            </div>
            {gameResult == "Correct!" ? 
            <div className="col">
            <MDBBtn color="primary" style={{float:'right', marginRight:'100px'}} onClick={finishGame}>
              <DoneOutlineIcon /> Finished
            </MDBBtn>
          </div>:<div className="col">
            <Link to={'/'}>
            <MDBBtn color="danger" style={{float:'right', marginRight:'100px'}} onClick={BackGame}>
              <ArrowBackIcon /> Back
            </MDBBtn>
            </Link>
          </div>
          }
            
          </div>
          <br />
        </div>
        <br />
      </div>
    </>
  );
  function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;

    console.log("Active : " + active.id);
    console.log("Over : " + over.id);

    if (active.id !== over.id) {
      setGameText((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
}
