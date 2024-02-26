"use client";
import React, { useState } from "react";
import authBg from "@/assets/images/authBg.jpeg";
import Image from "next/image";
import SignUpStep1 from "@/components/signUpFlow/SignUpStep1";
import SignUpStep2 from "@/components/signUpFlow/SignUpStep2";
import SignUpStep3 from "@/components/signUpFlow/SignUpStep3";
import SignUpStep4 from "@/components/signUpFlow/SignUpStep4";
import SignUpStep5 from "@/components/signUpFlow/SignUpStep5";

const SignUp = () => {

    const [signUpStep,setSignUpStep]=useState(1);   //to control the signUp flow

  return (
    <div className='flex w-full justify-between h-screen'>
        <div className='w-[50vw] h-full '>
            <Image alt="bg" className='w-full h-full object-cover' src={authBg}/>
        </div>
        <div className="flex justify-center py-8 h-full w-[50vw] bg-[#FDD1CB]">
            {signUpStep===1 && <SignUpStep1 setSignUpStep={setSignUpStep}/>}
            {signUpStep===2 && <SignUpStep2 setSignUpStep={setSignUpStep}/>}
            {signUpStep===3 && <SignUpStep3 setSignUpStep={setSignUpStep}/>}
            {signUpStep===4 && <SignUpStep4 setSignUpStep={setSignUpStep}/>}
            {signUpStep===5 && <SignUpStep5/>}
        </div>
    </div>
  );
};

export default SignUp;
