const calculateScore=(matchedSkills, totalSkills)=>{
    if (totalSkills===0){
        return 0
    }else {
        return Math.round((matchedSkills.length/totalSkills)*100);
    }
};
module.exports=calculateScore;