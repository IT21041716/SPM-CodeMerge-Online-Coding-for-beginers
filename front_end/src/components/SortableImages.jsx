import {useSortable} from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities";
import Card from "react-bootstrap/Card";
import {CardMedia} from "@mui/material";

export function SortableImages(props){
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id:props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: "transform 0.2s ease-in-out"
    }

    return (
        <div key={props.id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card body className="m-3">
            <CardMedia component="img" image={`../../public/ImagesG/${props.id}`} alt={props.id}/>
            </Card>
            {/* <h1>{props.id}</h1> */}
        </div>
    //     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    //     <h1>{props.id}</h1>
    // </div>
    )
}