const Nt = require('ntseq');
const {NWaligner} = require('seqalign');
const defaultAligner = NWaligner();
const dal = require("../dal/dal");
//using NWaligner
async function findAllMatchSeq(customerName, query, date, cutoffUser) {
    console.log(customerName, query , customerName, date, cutoffUser);
    try {
        let allMatchSeqArr = [];
       
        const sql = `SELECT raw_data, seq_id, customer, UPPER(sequence) as sequence, location, number, date FROM bid WHERE customer = '${customerName}' AND  date LIKE '%${date}%' ORDER BY STR_TO_DATE(date, '%d/%m/%Y') DESC`
        const seqArr = await dal.execute(sql);
        console.log("number of sequences: ", seqArr.length)
        for (let i = 0; i < seqArr.length; i++) {
           
            const defaultResult = defaultAligner.align(query,seqArr[i].sequence);

            //return the identity
            // let cutoffCurrentSeq = (map.best().alignmentMask().sequence().replace(/-/g, "").length / querySeq.size()) * 100;
            const queryOriginalLength = defaultResult.originalSequences[0].length;
            const queryAlignedLength = defaultResult.alignedSequences[0].length;
            let cutoffCurrentSeq = (defaultResult.score / queryOriginalLength) * 100;
            // let cutoffCurrentSeq = (queryOriginalLength / queryAlignedLength) * 100;
            console.log(cutoffCurrentSeq);

            //return the sequence matching
            // console.log(map.best().alignmentMask().sequence());

            if (cutoffCurrentSeq >= cutoffUser) {
                let matchSeqObj = new Object();
                // matchSeqObj.bidData = seqArr[i];
                matchSeqObj.identity = cutoffCurrentSeq;
                matchSeqObj.sequenceLength = queryOriginalLength;
                matchSeqObj.score =defaultResult.score;
                matchSeqObj.alignmentMask = defaultResult.alignment;
                matchSeqObj.seqId = seqArr[i].seq_id;
                matchSeqObj.date = seqArr[i].date;
                matchSeqObj.customerName = seqArr[i].customer;
                
                allMatchSeqArr.push(matchSeqObj);
            }
        }

        return allMatchSeqArr;
    }

    catch (e) {
        return e;
    }
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