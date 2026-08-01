import { useState } from "react";
import JobdescContext from "./jobdescContext";

const JobdescState=(props)=>{
  const jobdescInitial=[];
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";

const [jobdesc, setjobdesc] = useState(jobdescInitial);
const getjobdesc=async()=>{
  const response =await fetch(`${host}/api/jobdesc/fetchjobdesc`,{
    method:"GET",
    headers:{
      "auth-token":localStorage.getItem("token")
    }
  });
  const json = await response.json();
  setjobdesc(json);
};

const addjobdes=async(title , company , text , parsedData)=>{
  const response = await fetch(`${host}/api/jobdesc/addjobdesc`,{
    method:"POST",
    headers:{
      "Content-type":"application/json",
      "auth-token":localStorage.getItem("token")
    },
    body:JSON.stringify({title,company,text,parsedData})
  });
  const json = await response.json();
  return json
};

const deletejobdes=async (id)=>{
  const response = await fetch(`${host}/api/jobdesc/deletejobdesc/${id}`,{
    method:"DELETE",
    headers:{
      "Content-type":"application/json",
      "auth-token":localStorage.getItem("token")
    }
  });
  const json= await response.json();
  if (json && json.success){
    const newjob = jobdesc.filter((j)=>j._id!== id);
    setjobdesc(newjob);
  }
  return json;
}

    return(
        <JobdescContext.Provider value={{jobdesc,getjobdesc,addjobdes,deletejobdes}}>
            {props.children}
        </JobdescContext.Provider>
    )
}
export default JobdescState;