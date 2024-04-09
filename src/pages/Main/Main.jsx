import axios from "axios";
import Todo from "../../components/todo/Todo";
import style from "./main.module.css"
import { useEffect ,useState , useRef } from "react";
import uuid4 from "uuid4";

function Main(){

    const ref = useRef(null);

    const [edit, setEdit] = useState({
        editedId:"",
        isEditing:false
    });
    
    const [todos , setTodos] = useState([]);

    const [todo , setTodo] = useState({
        id: 1,
        todo: "",
    });

    const deleteItem = (id) =>{
        axios.delete(`http://localhost:8000/data/${id}`).then(()=>{
            setTodos(todos.filter((todo) => (todo.id !== id)));
        });
    }

    const editItem = (id) =>{
        axios.get(`http://localhost:8000/data/${id}`).then((result)=>{
            ref.current.value = result.data.todo;
            setEdit({
                editedId:result.data.id,
                isEditing:true
            })
        });
    }

    const handleChange = (e)=>{
        setTodo((prev)=>({
            ...prev,
            id: uuid4(),
            todo: e.target.value
        }))
    }


    const saveBtn = ()=>{
        if(ref.current.value !== ""){
            if(edit.isEditing){
                axios.put(`http://localhost:8000/data/${edit.editedId}` , todo).then((result)=>{
                    setTodos(todos.map(todo => 
                        todo.id === edit.editedId ? { ...todo, todo: result.data.todo } : todo
                    ));
                    
                    setEdit({
                        editedId:"",
                        isEditing:false
                    })
                    setTodo({});
                    onClear(); 
                })
            }else{
                axios.post("http://localhost:8000/data/" , todo).then((result)=>{
                    setTodos(todos.concat(result.data));
                    setTodo({});
                    onClear();
                })
            }
        }
    }

    const onClear = () => {
        ref.current.value = "";
    };


    useEffect(()=>{
        axios.get("http://localhost:8000/data").then((result)=>{
            setTodos(result.data);   
        }).catch(error=>{
            console.log(error);
        });
    },[]);

    return(
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.inputBar}>
                    <input ref={ref} type="text" className={style.input} onChange={handleChange} required/>
                    <button className={style.saveBtn} onClick={saveBtn}>Save!</button>
                </div>
                <div className={style.todoContainer}>
                {
                    todos.map(todo =>(
                        <Todo key={todo.id} data={todo} handleDelete={deleteItem} handleEdit={editItem}/>  
                    ))
                }
                </div>
            </div>
        </div>
    );
}

export default Main;