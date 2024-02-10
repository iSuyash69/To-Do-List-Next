"use client"
import { useState } from "react";
import { toast } from "sonner";

const AddTask=()=>{

    const [task,setTask]=useState<string>("");

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault();

        console.log(task);

        if(task.length!==0){
            return;
        }

        toast.info("No task to add");
        return;
    };

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        setTask(e.target.value);
    };


    return(
        <form onSubmit={handleSubmit} className="mt-5 flex items-center">
            <input className="py-3 px-3 rounded-bl-xl rounded-tl-xl outline-pink-300 w-96" type="text" placeholder="Add a new task" value={task} onChange={handleInputChange}></input>
            <button className="px-10 rounded-br-xl border-l-2  hover:bg-pink-600 border-gray-300 rounded-tr-xl text-white font-medium bg-pink-500 py-3" type="submit">ADD</button>
        </form>
    );  
}

export default AddTask;