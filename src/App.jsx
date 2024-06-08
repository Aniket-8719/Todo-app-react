import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(()=>{
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])

const saveToLS = (params)=>{
  localStorage.setItem("todos", JSON.stringify(todos));
}

const showCompleted = ()=>{
  setShowFinished(!showFinished);

}

  const handleAdd = (e)=>{
    if(todo === ""){
      saveToLS();
      alert("Enter the Todo Name");
      
    }else{
      setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}]);
      setTodo("");
      saveToLS();
    }
 
  }
  const handleChange = (e)=>{
    setTodo(e.target.value);
  }
  
  

  const handleCheckBox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }


 const handleDelete = (e, id)=>{
  let newTodos = todos.filter(item=>{
    return item.id !== id;
  });
  setTodos(newTodos);
  saveToLS();
 }

 const handleEdit = (e,id)=>{
  let  t = todos.filter(i=>i.id === id)
  setTodo(t[0].todo);
  let newTodos = todos.filter(item=>{
    return item.id!==id
  }); 
  setTodos(newTodos) 
  saveToLS();
}

  return (
   <>
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-TodoBox min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>MyTodo</h1>
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} placeholder='Enter Todo name' value={todo} type="text" className='w-full rounded-l-lg px-5 py-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'/>
          <button onClick={handleAdd} className='bg-btnColor  rounded-r-lg hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
         </div>

        <div className='flex items-center  gap-2'>
        <input onChange={showCompleted} checked={showFinished} className='my-4 w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' id='show'  type="checkbox" /> 
         <label className='mx-2' htmlFor="show">Show Finished</label> 
        </div>
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

         <h2 className='text-2xl font-bold'>Your Todos</h2>
         <div className="todos">
         {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
          {
          todos.map(item=>{

          return( showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
            <div className='flex gap-5 items-center'> 
            <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-btnColor hover:bg-violet-950 p-2 py-2 text-xl font-bold text-white rounded-full mx-1  '><MdEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-btnColor hover:bg-violet-950 p-2 py-2 text-xl font-bold text-white rounded-full mx-1  '><MdDelete /></button>
            </div> 
          </div>
          })}
         </div>
        
       </div>
      
   </>
  )
}

export default App
