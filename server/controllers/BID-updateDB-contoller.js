
const bidLogic = require("../bll/BID-logic");
const { MY_SQL_TABLE } = require("../models/constants");
const BidReadFileController = require("./BID-readFile-contoller");




const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const execute = async (intervalDuration) => {
    try {

        // const responseNewDB = await BidReadFileController.insertNewDB()
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
































