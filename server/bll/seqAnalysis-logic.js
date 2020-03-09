const Nt = require('ntseq');
const { NWaligner, SWaligner } = require('seqalign');
const defaultAligner = NWaligner();
const dal = require("../dal/dal");
//using NWaligner
async function findAllMatchSeq(customerName, query, date, cutoffUser) {
    try {
        console.log(customerName, query, customerName, date, cutoffUser);
        let allMatchSeqArr = [];
        const sql = `SELECT raw_data, seq_id, customer, UPPER(sequence) as sequence, location, number, date FROM bid WHERE customer = '${customerName}' AND  date LIKE '%${date}%' ORDER BY STR_TO_DATE(date, '%d/%m/%Y') DESC`
        const seqArr = await dal.execute(sql);
        console.log("number of sequences: ", seqArr.length)
        for (let i = 0; i < seqArr.length; i++) {

            //fast aligment of the initals 150 bp
            const halfQuery = query.slice(0, 150);
            const halfArray = seqArr[i].sequence.slice(0, 150);
            let {identityScore} = ResultOfTwoSequencesAligment(halfQuery, halfArray)

            // if the result of the identityScore is high (95) then do the aligment to the complete sequences. in the future we can remove it and just check:
            //if (aligmentResult.identityScore >= cutoffUser)
            if (identityScore >= 95) {
                const aligmentResult = ResultOfTwoSequencesAligment(query, seqArr[i].sequence);
                //checking if  the identityScore of the complete sequence meets the user cutoff
                if (aligmentResult.identityScore >= cutoffUser) {
                    console.log(aligmentResult.identityScore);
                    let matchSeqObj = new Object();
                    // matchSeqObj.bidData = seqArr[i];
                    matchSeqObj.identity = aligmentResult.identityScore;
                    matchSeqObj.sequenceLength = aligmentResult.queryOriginalLength;
                    matchSeqObj.score = aligmentResult.score;
                    matchSeqObj.alignmentMask = aligmentResult.alignment;
                    matchSeqObj.seqId = seqArr[i].seq_id;
                    matchSeqObj.date = seqArr[i].date;
                    matchSeqObj.customerName = seqArr[i].customer;

                    allMatchSeqArr.push(matchSeqObj);
                }
            }
        }
        return allMatchSeqArr;
    }

    catch (e) {
        console.log(e)
        return e;
    }
}

//use here the 'seqalign' library 
function ResultOfTwoSequencesAligment(firstSeq, secondSeq) {
    const defaultResult = seqeunceAlign(firstSeq, secondSeq);
    const queryOriginalLength = defaultResult.originalSequences[0].length;
    const queryAlignedLength = defaultResult.alignedSequences[0].length;
    const identityScore = identityCalculator(defaultResult.score, queryOriginalLength);
    return {
        identityScore,
        queryOriginalLength,
        score:defaultResult.score,
        alignment:defaultResult.alignment
    };
}

//return the identity score 
function identityCalculator(score, seqLength) {
    return score / seqLength * 100;
}

//the alignment function from 'seqalign' library 
function seqeunceAlign(fisrtSeq, secondSeq) {
    return defaultAligner.align(fisrtSeq, secondSeq);
}

// async function findAllMatchSeq(customerName, query, date, cutoffUser) {
//     console.log(customerName, query , customerName, date, cutoffUser);
//     try {
//         let allMatchSeqArr = [];

//         const sql = `SELECT raw_data, seq_id, customer, UPPER(sequence) as sequence, location, number, date FROM bid WHERE customer = '${customerName}' AND  date LIKE '%${date}%' ORDER BY STR_TO_DATE(date, '%d/%m/%Y') DESC`
//         const seqArr = await dal.execute(sql);
//         const querySeq = new Nt.Seq().read(query);
//         for (let i = 0; i < seqArr.length; i++) {

//             let seq = (new Nt.Seq()).read(seqArr[i].sequence);

//             let map = new Nt.MatchMap(querySeq, seq);
//             map.initialize();
//             map.sort();

//             //return the identity
//             let cutoffCurrentSeq = (map.best().alignmentMask().sequence().replace(/-/g, "").length / querySeq.size()) * 100;
//             console.log(cutoffCurrentSeq);

//             //return the sequence matching
//             // console.log(map.best().alignmentMask().sequence());

//             if (cutoffCurrentSeq >= cutoffUser) {
//                 let matchSeqObj = new Object();
//                 // matchSeqObj.bidData = seqArr[i];
//                 matchSeqObj.identity = cutoffCurrentSeq;
//                 matchSeqObj.sequenceLength = seq.size();
//                 matchSeqObj.score = map.best().score;
//                 matchSeqObj.alignmentMask = map.best().alignmentMask().sequence();
//                 matchSeqObj.seqId = seqArr[i].seq_id;
//                 matchSeqObj.date = seqArr[i].date;
//                 matchSeqObj.customerName = seqArr[i].customer;

//                 allMatchSeqArr.push(matchSeqObj);
//             }
//         }

//         return allMatchSeqArr;
//     }

//     catch (e) {
//         return e;
//     }
// }




module.exports = {
    findAllMatchSeq
}