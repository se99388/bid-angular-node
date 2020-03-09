const dal = require("../dal/dal");
count = 0
async function addBid(bidArray){
    try{
        console.log("count: ", count++)
        for (bid of bidArray) {
            const sql = `insert into bid(raw_data, seq_id, customer, sequence, location, number, date) values ('${bid.rawData}', '${bid.seqId}', '${bid.customer}', '${bid.sequence}', '${bid.folder}', ${bid.number}, '${bid.date}') `
            const info = await dal.execute(sql);
            bid.id = info.insertId;
        }
        return bidArray;
    }
    catch(e){
        return e;
    }
  
}

async function deleteTableContent(tableName){
    try{
        console.log("tableName",tableName)
        const sql = `DELETE FROM ${tableName}`;
        const info = await dal.execute(sql);
        return info;
    }catch(e){
        return e;
    }
}

async function initalTableIdNumber(tableName){
    try{
        const sql = `ALTER TABLE ${tableName} AUTO_INCREMENT=1`;
        const info = await dal.execute(sql);
        return info;
    }catch(e){
        return e;
    }
}

async function addBid(bidArray){
    try{
        console.log("count: ", count++)
        for (bid of bidArray) {
            const sql = `insert into bid(raw_data, seq_id, customer, sequence, location, number, date) values ('${bid.rawData}', '${bid.seqId}', '${bid.customer}', '${bid.sequence}', '${bid.folder}', ${bid.number}, '${bid.date}') `
            const info = await dal.execute(sql);
            bid.id = info.insertId;
        }
        return bidArray;
    }
    catch(e){
        return e;
    }
  
}


module.exports = {
    addBid,
    deleteTableContent,
    initalTableIdNumber
}