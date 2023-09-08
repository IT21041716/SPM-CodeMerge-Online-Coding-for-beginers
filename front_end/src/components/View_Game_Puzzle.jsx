import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableImages } from "./SortableImages";

export default function ViewGamePuzzle() {
  const { gameId } = useParams();
  const [gameModuleName, setGameModuleName] = useState("");
  const [gameModuleTopic, setGameModuleTopic] = useState("");
  const [gameImages, setGameImages] = useState([]);
  const [gameDiscussion, setGameDiscussion] = useState([]);

  const getGame = () => {
    axios
      .get(`http://localhost:8080/v1/game/view/${gameId}`)
      .then((res) => {
        const getOneGame = {
          gameModuleName: res.data.gameModuleName,
          gameModuleTopic: res.data.gameModuleTopic,
          gameImages: Object.entries(res.data.images),
          gameDiscussion: res.data.gameDiscussion,
        };
        console.log(Object.entries(res.data.images));
        setGameModuleName(getOneGame.gameModuleName);
        setGameModuleTopic(getOneGame.gameModuleTopic);
        setGameImages(getOneGame.gameImages);
        setGameDiscussion(getOneGame.gameDiscussion);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => getGame(), []);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={gameImages}
        strategy={verticalListSortingStrategy}
      >
        {gameImages.map((index) => (
          <SortableImages key={Object.entries(index)[1][1]} id={Object.entries(index)[1][1]} />
        ))}
              <h3>The Best programmig languages</h3>
      </SortableContext>

    </DndContext>
  );

  function handleDragEnd(event){
    console.log("Drag end called");
    const {active, over} = event;

    console.log("Active : " + active.id);
    console.log("Over : " + over.id);

    // if(active.id !== over.id){
    //   setLanguages((items) => {
    //     const activeIndex = items.indexOf(active.id);
    //     const overIndex = items.indexOf(over.id);
    //     console.log(arrayMove(items,activeIndex,overIndex));

    //     return arrayMove(items,activeIndex,overIndex);
    //   });
    // }

  }

}
