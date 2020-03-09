const seqAnalysisLogic = require("../bll/seqAnalysis-logic");
const express = require("express");

const router = express.Router();

router.get("/seqAnalysis/:customer/:seq/:year/:cutoff",async (request,response)=>{
    try{
        
        const allMatchSeq = await seqAnalysisLogic.findAllMatchSeq(request.params.customer, request.params.seq, request.params.year, request.params.cutoff);

        allMatchSeq.sort((matchSeq1, matchSeq2)=>{
            let sortByScore =  matchSeq2.score-matchSeq1.score;
            if (sortByScore !== 0){
                return sortByScore;
            }
            return matchSeq2.sequenceLength - matchSeq1.sequenceLength;
        });
        response.json(allMatchSeq);
    }
    catch(e){
        response.status(500).json(e);
    }
});

module.exports = router;