import { useState } from "react";
import loginFacebook from "@/assets/images/loginFacebook.png";
import loginGoogle from "@/assets/images/loginGoogle.png";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constants";

const SignUpStep1=({setSignUpStep})=>{

    const router = useRouter();

    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {

      e.preventDefault();
      setError("");
      setLoading(true);

      if (formData.password === formData.confirmPassword) {
        try {
          const response = await axios.post(
            `${BASE_URL}/user/signUp`,
            { email: formData.email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            setRegisterData(formData);
            setLoading(false);
            // router.push("sign-up/otp");
            setSignUpStep(2);
          }
          else{
              setError("error registering");
              setLoading(false);
          }
        } 
        catch (error) {
          if(error?.response?.status == 409){
            setError("Account already exist");
            setLoading(false);
            return;
          }
          setError("Something went wrong");
          console.error("Error uploading data:", error);
          setLoading(false);
        }
      } 
      else {
        setError("password doesn't match");
        setLoading(false);
      }
    };
    
    return(
        <div className='self-center ml-5 flex flex-col bg-[#C50042] w-[400px] rounded-xl  px-9 py-7'>
          <h1 className='text-5xl text-white w-1/2 font-semibold'>Hola!</h1>
          <div className='flex flex-col mt-3 gap-3'>
            <p className='text-white font-medium text-lg'>Sign Up</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <input value={formData.name} name='name' onChange={handleChange} className='w-full px-3 py-3 rounded-xl' placeholder='Username' type='mail' required></input>
              <input value={formData.email} name='email' onChange={handleChange} className='w-full px-3 py-3 rounded-xl' placeholder='Email' type='mail' required></input>
              <input value={formData.password} name='password' onChange={handleChange} className='w-full px-3 py-3 rounded-xl' placeholder='Password' type='password' required ></input>
              <input value={formData.confirmPassword} name='confirmPassword' onChange={handleChange} className='w-full px-3 py-3 rounded-xl' placeholder='Confirm Password' type='password' required ></input>
              {error && 
              <div className='bg-white  text-red-600 rounded-md font-medium w-fit px-3 '>{error}</div>
              }
              <button type="submit" className="bg-white m-auto px-6 py-1.5 hover:text-[#C50042] font-semibold rounded-xl">{
                loading ? (
                  <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                  </svg>
                  ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>
          <div className='flex gap-3 m-auto mt-5'>
            <div onClick={()=>signIn('google')}  className='bg-white cursor-pointer hover:bg-gray-200 rounded-full p-2 w-12 h-12 '>
              <Image className='h-full w-full' src={loginGoogle}></Image>
            </div>
            <div className='bg-white rounded-full cursor-pointer hover:bg-gray-200 p-1.5 w-12 h-12'>
              <Image className='h-full w-full' src={loginFacebook}></Image>
            </div>
          </div>
          <div className='m-auto flex flex-col gap-1.5 mt-4'>
            <p className=' text-white '>Already a member ?</p>
            <button onClick={()=>router.push('/sign-in')} className='bg-white m-auto px-3 py-1 text-[#C50042] font-semibold text-sm rounded-xl'>Login</button>
          </div>
        </div>
    );
}


export default SignUpStep1;