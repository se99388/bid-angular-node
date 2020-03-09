
const dal = require("../dal/dal");

async function getAllCustomers(){
    try{
            const sql = `SELECT distinct customer FROM bid` 
            const AllCustomersArr = await dal.execute(sql);

        return AllCustomersArr;
    }
    catch(e){
        return e;
    }
  
}


module.exports = {
    getAllCustomers
}