import { useState } from "react";
import JobappContext from "./jobappContext";

const JobappState =(props)=>{
    const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const jobappInitial=[]
    const [jobapp, setjobapp] = useState(jobappInitial);
    const getjobapp=async()=>{
        const response = await fetch(`${host}/api/application/fetchajobpplic`,{
            method:"GET",
            headers:{
                "auth-token":localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setjobapp(json)
    }
    const addjobapp=async (resume, jobdesc , status , notes)=>{
        const response= await fetch(`${host}/api/application/addjobapplica`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "auth-token":localStorage.getItem("token")
            },
            body:JSON.stringify({resume , jobdesc , status , notes })
        });
        const json= await response.json();
        if (json && json._id){
            setjobapp(jobapp.concat(json));
        }
        return json
    };
    const updatejobapp=async (id , resume , jobdesc, status , notes )=>{
        const response = await fetch (`${host}/api/application/updatejobapplica/${id}`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json",
                "auth-token":localStorage.getItem("token")
            },
            body:JSON.stringify({ resume , jobdesc, status , notes})
        })
        const json = await response.json();
        if(json && json._id){
            const newjobapp = jobapp.map((japp)=>{
                if (japp._id === id){
                    return {...japp , status , notes}

                }
            return japp
        });
        setjobapp(newjobapp);
        }
        return json
    }
    const deletejobapp=async (id)=>{
        const response = await fetch(`${host}/api/application/deletejobapplica/${id}`,{
            method:"DELETE",
            headers:{
            "Content-type":"application/json",
            "auth-token":localStorage.getItem("token")
            }
        });
        const json= await response.json();
        if(json && json.success){
            const newjob = jobapp.filter((japp)=>japp._id!== id);
            setjobapp(newjob);
        }
        return json
    }

    return (
        <JobappContext.Provider value={{jobapp,getjobapp, addjobapp, updatejobapp, deletejobapp}}>
            {props.children}
        </JobappContext.Provider>
    )
}
export default JobappState;