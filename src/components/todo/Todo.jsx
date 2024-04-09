import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./todo.module.css"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Todo(props){

    return(
        <div className={style.todo}>
            <p className={style.todoMessage}>{props.data.todo}</p>
            <div className={style.actions}>
                <div><FontAwesomeIcon icon={faPenToSquare} onClick={ ()=> (props.handleEdit(props.data.id))}/></div>
                <div><FontAwesomeIcon icon={faTrash} onClick={ ()=> (props.handleDelete(props.data.id))}/></div>
            </div>
        </div>
    );
}

export default Todo;