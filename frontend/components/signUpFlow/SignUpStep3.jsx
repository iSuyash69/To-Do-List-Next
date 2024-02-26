import { useState } from "react";
import constants from '@/utils/constants';
import axios from "axios";

const SignUpStep3=({setSignUpStep})=>{

    const [formData, setFormData] = useState({
        dob: "",
        gender: "",
        phone_number: "",
        address:"",
    });
    
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const handleSubmit = async(e) => {

        e.preventDefault();
    
        setLoading(true);
        setError("");
    
        try {
            const response = await axios.post(`${constants.BASE_URL}/user/emailOtpVerification`,formData,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
      
              if (response.status == 200) {
                setRegisterData(...formData);
                setLoading(false);
                setSignUpStep(4);
                return;
              }

            } 
            catch (error) {
              console.error("Error uploading data:", error);
              setError("Something went wrong");
              setLoading(false);
            }
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    return(
        <div className='self-center ml-5 flex flex-col bg-[#C50042] w-[400px] rounded-xl  px-9 py-7'>
          <h1 className='text-5xl text-white w-1/2 font-semibold'>Hola!</h1>
          <div className='flex flex-col mt-3 gap-3'>
            <p className='text-white font-medium text-lg'>Complete your Profile</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <div className="relative">
                    <input value={formData.dob} name='dob' onChange={handleChange} className='w-full px-3 pb-1 pt-5 rounded-xl' placeholder='Date of Birth' type='date' required></input>
                    <span className="absolute w-full text-gray-400 text-[15px] top-0.5 left-3">Date of Birth</span>
                </div>
              <select name="gender" value={formData.gender} onChange={handleChange} className={`w-full cursor-pointer ${formData.gender=="" ? "text-gray-400" : ""} px-3 py-3 rounded-xl`}>
                <option className="hidden" value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer not to say">Prefer not to say</option>
              </select>
              <input value={formData.phone_number}  name='phone_number' onChange={handleChange} className='w-full px-3 py-3 rounded-xl' placeholder='Mobile Number' type='number'  ></input>
              <input value={formData.address} name='address' onChange={handleChange} className='w-full px-3 py-3 rounded-xl' placeholder='Address' type='text'></input>
              {error && 
              <div className='bg-white  text-red-600 rounded-md font-medium w-fit px-3 '>{error}</div>
              }
              <button type="submit" className="bg-white m-auto px-6 py-1.5 hover:text-[#C50042] font-semibold rounded-xl">{
                loading ? (
                  <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                  </svg>
                  ) : (
                  "Proceed"
                )}
              </button>
            </form>
            <button onClick={()=>setSignUpStep(4)} className="self-end text-white">Skip for now</button>
          </div>
        </div>
    );
}

export default SignUpStep3;