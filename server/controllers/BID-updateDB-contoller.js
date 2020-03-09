
const bidLogic = require("../bll/BID-logic");
const { MY_SQL_TABLE } = require("../models/constants");
const BidReadFileController = require("./BID-readFile-contoller");




const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const execute = async (intervalDuration) => {
    try {
        // await sleep(900000);
        // const deleteBidTable = await bidLogic.deleteTableContent(MY_SQL_TABLE);
        // if (deleteBidTable) {
        //     await bidLogic.initalTableIdNumber(MY_SQL_TABLE);



        const responseNewDB = await BidReadFileController.insertNewDB()
        console.log(`The New DB: ${responseNewDB}`);
        // wait half day 
        await sleep(intervalDuration);

        execute(intervalDuration);
        // }
    } catch (ex) {
        console.log(`Error: ${ex.message}`);
    }
};


module.exports = execute
































