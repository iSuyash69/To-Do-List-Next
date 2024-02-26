import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

const SignUpStep5=()=>{

    const router=useRouter();

    return(
        <div className='self-center ml-5 flex flex-col bg-[#C50042] w-[400px] rounded-xl px-7 py-20'>
            <h1 className='text-5xl  text-center text-white w-full font-semibold'>Great!</h1>
            <p className="m-auto font-semibold text-white">It's all set.</p>
            <div onClick={()=>router.push("/")} className="mt-12 cursor-pointer hover:bg-gray-300 transition-all duration-300 bg-white mb-10 m-auto py-2 rounded-2xl px-5">
                <IoIosArrowForward className="text-[#C50042] text-3xl"/>
            </div>
        </div>
    );
}

export default SignUpStep5;