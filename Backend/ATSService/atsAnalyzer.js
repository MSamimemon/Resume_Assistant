const matchresume=require('./resumeMatcher');
const calculateScore=require('./scoreCalculator');


const atsAnalyzer=(resumeSkills,jobSkills)=>{
  

    const result = matchresume(
        resumeSkills,jobSkills
    )

    const score = calculateScore(
        result.matchedSkills,
        jobSkills.length
    );

    return{
        atsScore: score ,
        matchedSkills: result.matchedSkills,
        missingSkills: result.missedSkills,
        suggestions: result.missedSkills.map(skill => `Add "${skill}" to your resume`)
    }
};
module.exports= atsAnalyzer;