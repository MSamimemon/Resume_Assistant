import { useState } from "react";
import atsContext from "./atsContext";

const AtsState = (props) => {
    let success=false;
    const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const [loading, setLoading] = useState(false);
    const [atsHistory, setAtsHistory] = useState([]);
    const analyzeATS = async (resumeId, jobdescId) => {
    setLoading(true);
    try {
        const response = await fetch(`${host}/api/ats/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          resumeId,
          jobdescId,
        }),
        });

        const json = await response.json();
        console.log("ATS Response:", json);
        return json;
    }catch (error) {
        console.error(error);
        return {success ,message: "Server Error",};
    }finally {
        setLoading(false);
    }
  };

   const getAtsHistory = async () => {
    try {
        const response = await fetch(`${host}/api/ats/history`,{
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = await response.json();
        if (json.success) {
        setAtsHistory(Array.isArray(json.history)? json.history: []);
        }else{
            setAtsHistory([]);
        }
        return json;
    } catch (error) {
        console.error("ATS History Error:",error);
        return {success ,message: "Server Error"};
    }
  };

  return (
    <atsContext.Provider value={{ analyzeATS, loading ,getAtsHistory,
        atsHistory}}>
      {props.children}
    </atsContext.Provider>
  );
};

export default AtsState;
