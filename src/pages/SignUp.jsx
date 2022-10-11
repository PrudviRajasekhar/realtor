import React, { useState } from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import {db} from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });
  const {name,email,password} = formData;
  const navigate = useNavigate();
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value,
    }))
  }
  async function onSubmit(e){
      e.preventDefault()
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        updateProfile(auth.currentUser,{
          displayName:name
        })
        const user = userCredential.user
        const formDataCopy = {... formData}
        delete formDataCopy.password ;
        formDataCopy.timestamp = serverTimestamp();
        await setDoc(doc(db,"users",user.uid),formDataCopy);
        // toast.success("Successful Sign Up");
        navigate("/");
        //console.log(user);
      } catch (error) {
        toast.error("Something went wrong with registration")
      }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap
            items-center px-6 py-12 max-w-6xl mx-auto">  
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                alt="key"
                className="w-full rounded-2xl" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
          <input className="w-full px-4 py-2 text-xl text-gray-700
                     bg-white border-gray-300 rounded transition ease-in-out
                     mb-6"
                    type="text" 
                    id="name" 
                    value={name} 
                    placeholder="Full Name"
                    onChange={onChange} />

            <input className="w-full px-4 py-2 text-xl text-gray-700
                     bg-white border-gray-300 rounded transition ease-in-out
                     mb-6"
                    type="email" 
                    id="email" 
                    value={email} 
                    placeholder="Email address"
                    onChange={onChange} />

              <div className="relative mb-6">
              <input className="w-full px-4 py-2 text-xl text-gray-700
                     bg-white border-gray-300 rounded transition ease-in-out"
                    type={showPassword ? "text" : "password"}
                    id="password" 
                    value={password} 
                    placeholder="Password"
                    onChange={onChange} />
                    {showPassword ? (
                      <AiFillEyeInvisible className="absolute right-3 
                          top-3 text-xl cursor-pointer"
                          onClick={() => setShowPassword((prevstate) => !prevstate)}/>
                    ):(<AiFillEye className="absolute right-3 
                          top-3 text-xl cursor-pointer"
                          onClick={() => setShowPassword((prevstate) => !prevstate)}/>)}
              </div>   
              <div className="flex justify-between
                     whitespace-nowrap text-sm sm:text-lg">
                 <p className="mb-6">Have a account?
                 <Link to="/sign-in" className="text-red-600 hover:text-red-800
                          transition duration-200 ease-in-out ml-1">Sign In</Link>
                 </p>  
                 <p>
                 <Link to="/forgotpassword" className="text-blue-600 hover:text-blue-800
                          transition duration-200 ease-in-out">Forgot Password?</Link>
                 </p>   
              </div>     
              <button type="submit" className="w-full bg-blue-600
                 text-white px-7 py-3 text-sm font-medium uppercase
                  rounded shadow-md hover:bg-blue-700
                  transition duration-150 ease-in-out
                  hover:shadow-lg active:bg-blue-800">
              Sign Up
          </button>
          <div className="flex items-center my-4 
                      before:border-t before:flex-1 
                      before:border-gray-300
                      after:border-t after:flex-1 
                      after:border-gray-300">
            <p className="text-center font-semibold mx-4">
              OR
            </p>
          </div> 
          <OAuth/>           
         </form>
        </div>
      </div>
    </section>
  )
}