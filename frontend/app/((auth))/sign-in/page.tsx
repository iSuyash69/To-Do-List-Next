"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import loginGoogle from "@/assets/images/loginGoogle.png"
import loginFacebook from "@/assets/images/loginFacebook.png"
import authBg from "@/assets/images/authBg.jpeg"
import axios from "axios";
import { toast } from "sonner";

interface FormData{
    email:string,
    password:string,
}

const SignIn=()=>{
    
    const router=useRouter();

    const [formData,setFormData]=useState<FormData>({
        email:"",
        password:"",
    });
    const [loading,setLoading]=useState<boolean>(false);
    const [error,setError]=useState<string>("");

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void>=> {
        e.preventDefault();
        console.log(formData);
        setError("");
        setLoading(true);
        try{
            const res=await axios.post("http://localhost:8080/user/sign-in",formData);
            if(res){
                // setError("");
                setLoading(false);
                console.log(res.data);
                return;
                // return router.push("/");
            }

            console.log("Something went wrong");
            setLoading(false);
            // setError("Something went wrong");
            toast.error("Something went wrong");
        }
        catch(error){
            console.log(error);
            setLoading(false);
            // setError("Something went wrong");
            toast.error("Something went wrong");
        }
    };

    return(
        <div className='flex w-full justify-between h-screen'>
            <div className="flex h-full w-[50vw] bg-[#FDD1CB]">
            <div className='self-center m-auto flex flex-col bg-[#C50042] w-[400px] rounded-xl  px-9 py-7'>
                <h1 className='text-4xl text-white w-1/2 font-semibold'>Welcome Back!</h1>
                <div className='flex flex-col mt-3 gap-3'>
                    <p className='text-white font-medium text-lg'>Login</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <input value={formData.email} name='email' onChange={handleChange} className='w-full px-3 py-3 rounded-xl' placeholder='Email' type='mail' required></input>
                        <input value={formData.password} name='password' onChange={handleChange} className='w-full px-3 py-3 rounded-xl' placeholder='Password' type='password' required ></input>
                        {error && 
                        <div className='bg-white  text-red-600 rounded-md font-medium w-fit px-3 '>{error}</div>
                        }
                        <button type="submit" className="bg-white m-auto px-6 py-1.5 hover:text-[#C50042] font-semibold rounded-xl">{
                            loading ? (
                                <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                </svg>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
                <div className='flex gap-3 m-auto mt-5'>
                    <div className='bg-white cursor-pointer hover:bg-gray-200 rounded-full p-2 w-12 h-12 '>
                        <Image alt="login-google" className='h-full w-full' src={loginGoogle}></Image>
                    </div>
                    <div className='bg-white rounded-full cursor-pointer hover:bg-gray-200 p-1.5 w-12 h-12'>
                        <Image alt="login-facebook" className='h-full w-full' src={loginFacebook}></Image>
                    </div>
                </div>
                <div className='m-auto flex flex-col gap-1.5 mt-4'>
                    <p className=' text-white '>Not a member yet?</p>
                    <button onClick={()=>router.push('/sign-up')} className='bg-white m-auto px-3 py-1 text-[#C50042] font-semibold text-sm rounded-xl'>Sign Up</button>
                </div>
            </div>
            </div>
            <div className='w-[50vw] h-full '>
                <Image alt="bg" className='w-full h-full object-cover' src={authBg}/>
            </div>
        </div>
    );
}

export default SignIn;