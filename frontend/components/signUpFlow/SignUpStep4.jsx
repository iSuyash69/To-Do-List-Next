import { useState } from "react";
import constants from '@/utils/constants';
import axios from "axios";
import { useFormik } from "formik";

const SignUpStep4=({setSignUpStep})=>{

    const [data,setData]=useState([]);      //use this to get the ID of the user
    const [error,setError]=useState("");
    const [profileImage,setProfileImage]=useState(null);
    const [loading, setLoading] = useState(false);

    const initialValues = {
        bio:'',
        profile_image:null,
    }

    const {values, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        onSubmit: async (values) => {

            const formData = new FormData();
            formData.append("profile_image", values.profile_image);

            setLoading(true);

            try {
                const response = await axios(`${constants.BASE_URL}/salon/updateUser/${data._id}`,formData);
                console.log(response)

                if (response.status === 200) {
                    setLoading(false);
                    setSignUpStep(5);
                } 
                else {
                    console.error("Error uploading:", response.status);
                    setLoading(false);
                    setError("Something went wrong");
                }
            } 
            catch (error) {
                console.error("Error uploading:", error);
                setLoading(false);
                setError("Something went wrong");
            }
        },
    });

    const handleProfileImageChange = (event) => {
        const file = event.currentTarget.files[0];
        setFieldValue("profile_image", file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result)
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        else {
            setProfileImage(null);
        };
    }

    return(
        <div className='self-center ml-5 flex flex-col bg-[#C50042] w-[400px] rounded-xl px-7 py-7'>
          <h1 className='text-5xl text-white w-1/2 font-semibold'>Hola!</h1>
          <div className='flex flex-col mt-3 gap-3'>
            <p className='text-white font-medium text-lg'>Complete your Profile</p>
            <form onSubmit={handleSubmit} className='flex flex-col w-full gap-5'>
                <div className="flex flex-col w-full gap-4">
                    <div className="w-full">
                        <label  className={`block w-full font-semibold text-[#C50042] p-2 rounded-tl-lg rounded-tr-lg bg-white focus:outline-none`} for="user_avatar">Profile Image</label>
                        <input name="card_image" onChange={handleProfileImageChange} onBlur={handleBlur} className={`block w-full text-sm cursor-pointer ${profileImage ? "" : "rounded-bl-lg rounded-br-lg"} text-gray-900 px-2 pb-2 bg-white focus:outline-none`} aria-describedby="user_avatar_help" accept="image/*" required type="file" />
                        {profileImage && 
                        <div className="pt-1 pb-4 pl-4 pr-4 border-b border-l border-r rounded-b-lg border-gray-300  bg-gray-50 ">
                            <div className="w-44 h-44 m-auto overflow-hidden border-[10px] border-[#031620] rounded-full shadow-md shadow-gray-400">
                                <img className="object-cover w-full h-full rounded-lg shadow-md shadow-gray-400" src={profileImage}/>
                            </div>
                        </div>
                        }
                    </div>
                    <div className="w-full flex flex-col">
                        <textarea name="bio" value={values.bio} onChange={handleChange} onBlur={handleBlur} className="h-32 w-full rounded-xl border-2 px-2 py-2 placeholder:text-[#C50042] placeholder:font-semibold" placeholder="Bio"></textarea>
                    </div>  
                </div>
                {error && 
                <div className='bg-white  text-red-600 rounded-md font-semibold w-fit px-3 '>{error}</div>
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
            <button onClick={()=>setSignUpStep(5)} className="self-end text-white">Skip for now</button>
          </div>
        </div>
    );
}

export default SignUpStep4;