"use client"
import AddTask from "@/components/addTask/AddTask";
import bg from "@/assets/images/bg.jpg";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const Page=()=>{

    const router:AppRouterInstance=useRouter();

    return(
        <div style={{backgroundImage:`url(${bg.src})`}} className="w-full relative bg-center bg-cover bg-no-repeat min-h-screen ">
            <button onClick={()=>router.push("/sign-in")} className="absolute top-5 right-10 bg-[#DB2777] py-2 px-5 text-white rounded-lg font-medium">Login</button>
            <div className="flex flex-col items-center px-8 py-6 bg-opacity-60 rounded-2xl bg-white absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-xl">My To-Do List</h1>
                <AddTask/>
            </div>
        </div>
    );
}

export default Page;