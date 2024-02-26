"use client"
import constants from '@/utils/constants';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const SignUpStep2=({setSignUpStep})=>{


  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));    //for handling otp input boxes focus change

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  useEffect(() => {

    let timer;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown === 0 ? 60 : prevCountdown - 1));
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
    
  }, [isResendDisabled]);

  const handleChange = (index, e) => {
    const { value } = e.target;
    setOtp(prevOtp => {
      let newOtp = prevOtp || '';
      newOtp = newOtp.substring(0, index) + value + newOtp.substring(index + 1);
      return newOtp;
    });
  
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp${index + 1}]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  const handleResend = async() => {

    console.log('Resending OTP...');
    setError("");

    try {
        const response = await axios.post(
          `${constants.BASE_URL}/user/signUp`,
          { email: registerData.email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 200) {

            setIsResendDisabled(true);
            setCountdown(60);
        
            setTimeout(() => {
              setIsResendDisabled(false);
            }, 60000);

           alert("otp resent successfully");
        }
        else if(response.status == 409){
            setError("account with this email already exist, login instead?");
        }
        else{
            setError("error registering");
        }
    } 
    catch (error) {
        console.error("Error uploading data:", error);
        setError("Something went wrong");
    }   
  };

  const handleSubmit = async(e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    if (otp) {
        try {
          const response = await axios.post(
            `${constants.BASE_URL}/user/emailOtpVerification`,
            {
              email: registerData.email,
              otpValue: otp,
              name: registerData.name,
              password: registerData.password,
            //   age: registerData.age,
            //   address: registerData.address,
            //   gender: registerData.gender,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.status == 200) {
            try {
                const email = registerData.email
                const password = registerData.password
                const res = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                });
                if (res.error) {
                    setError("Invalid Credentials");
                    setLoading(false);
                    return;
                  }
                  setLoading(false);
                  setSignUpStep(3);
            } 
            catch (error) {
                console.log(error);
                setError("Something went wrong");
                setLoading(false);
            }
          }
        } 
        catch (error) {
          console.error("Error uploading data:", error);
          setError("Something went wrong");
          setLoading(false);
        }
      } 
      else {
        setError("Enter a valid OTP");
        setLoading(false);
      }
  };


    return(
        <div className='self-center ml-5 flex flex-col bg-[#C50042] w-[400px] rounded-xl  px-9 py-10'>
            <h1 className='text-5xl text-white w-1/2 font-semibold'>Hola!</h1>
            <form onSubmit={handleSubmit} className="flex flex-col mt-3">
                <div className='flex flex-col gap-5'>
                    <p className="text-white text-xl font-medium ">Email Verification</p>
                    <div className='flex flex-col gap-2'>
                        <p className='text-white'>Enter the OTP sent to your Mail ID</p>
                        <div className='flex gap-2'>
                        {[...Array(6)].map((_, index) => (
                            <input key={index} type="text" maxLength="1" name={`otp${index}`} value={otp[index] || ''} onChange={(e) => handleChange(index, e)} ref={inputRefs[index]} className="w-12 h-12 text-3xl text-center border rounded-md" />
                        ))}
                        </div>
                        {error && 
                            <div className='bg-white  text-red-600 rounded-md font-medium w-fit mt-2 px-3 '>{error}</div>
                        }
                    </div>
                </div>
                <div className="flex items-center mt-6 m-auto">
                    <button type="submit" className="p-2 text-white bg-blue-500 rounded-md">{
                        loading ? (
                            <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                            </svg>
                        ) : (
                        "Verify OTP"
                    )}    
                    </button>
                    <button type="button" onClick={handleResend} disabled={isResendDisabled} className={`ml-4 ${isResendDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'} text-white p-2 rounded-md`}>{isResendDisabled ? `Resend in ${countdown}s` : 'Resend OTP'}</button>
                </div>
            </form>     
        </div>
    );
}

export default SignUpStep2; 