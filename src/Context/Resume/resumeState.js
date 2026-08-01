import { useState } from "react";
import ResumeContext from "./resumeContext";
const ResumeState=(props)=>{
    const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const resumeInitial=[];
    const [resume, setresume] = useState(resumeInitial);

// Get resumes 
const getresume=async()=>{
    const response = await fetch(`${host}/api/resume/fetchresume`,{
        method:"GET",
        headers:{
          "auth-token":localStorage.getItem("token")
        }
    });
    const json=await response.json();

    setresume(json);
};
// Add a resume 
const addresume=async (text , resumepath , parsedData)=>{
    //API Call Logic 
    const response = await fetch(`${host}/api/resume/addresume`,{
        method:"POST" ,
        headers:{
            "Content-type":"application/json",
          "auth-token":localStorage.getItem("token")
        },
        body:JSON.stringify({text , resumepath, parsedData})
    });
    const json=await response.json();
    return json
}
// Delete a resume 
const deleteresume=async(id)=>{
    const response = await fetch(`${host}/api/resume/deleteresume/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json",
          "auth-token":localStorage.getItem("token")
        }
    });
    
    const json= await response.json();
    if (json && json.success){
        const newresume = resume.filter((r) => r._id !== id);
        setresume(newresume);
    }
    return json 
};
// upload a resume 
const uploadresume=async(text , file)=>{
    const formData= new FormData();
    formData.append("text",text);
    formData.append("resume",file);
    const response = await fetch(`${host}/api/resume/uploadresume`,{
        method:"POST",
        headers:{
            "auth-token":localStorage.getItem("token")
        },
        body:formData
    });
    const json = await response.json();
    return json;
}

const updateresume=async (id , text , file )=>{
    const formData = new FormData();
    formData.append("text",text);
    formData.append("resume",file);
    const response = await fetch (`${host}/api/resume/updateresume/${id}`,{
        method:"PUT",
        headers:{
            "auth-token":localStorage.getItem("token")
        },
        body:formData
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message || "Failed to update resume");
    }
    return json;
}

    return (
        <ResumeContext.Provider value={{resume ,getresume, addresume,deleteresume,uploadresume,updateresume}}>
            {props.children}
        </ResumeContext.Provider>
    )
}
export default ResumeState;