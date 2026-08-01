const matchresume = (resumeSkills , jobSkills)=>{
    const matchedSkills=[];
    const missedSkills=[];

    jobSkills.forEach(skills => {
        if (resumeSkills.some(resumeSkill=>resumeSkill.toLowerCase()=== skills.toLowerCase())){
            matchedSkills.push(skills);
        }else {
            missedSkills.push(skills);
        }
    });
    return {
        matchedSkills,missedSkills
    };
}
module.exports=matchresume