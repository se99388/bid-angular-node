const bidGetCustomersLogic = require("../bll/BID-getCustomers-logic");

const express = require("express");

const router = express.Router();

router.get("/allCustomers", async (request, response)=>{
    try{
        const allCustomersResponse = await bidGetCustomersLogic.getAllCustomers();
        response.json(allCustomersResponse)
    }
    catch(e){
        response.status(500).json(e)
    }

});




module.exports = router;