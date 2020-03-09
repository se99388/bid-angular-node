const BidReadFileController = require("./controllers/BID-readFile-contoller");
// const {router} = require("./controllers/BID-readFile-contoller");
const BidUpdateDBContoller = require("./controllers/BID-updateDB-contoller");
const BidGetSeqContorller = require("./controllers/BID-getSeq-contorller");
const BidGetCustomersContorller = require("./controllers/BID-getCustomers-contorller");
const seqAnalysisContorller = require("./controllers/seqAnalysis-controller");
const startAutoDBUpdate = require("./controllers/BID-updateDB-contoller");
const {INTERVAL_UPDATE_IN_HOURS} = require("./models/constants")

const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/bid",BidGetSeqContorller);
server.use("/api/bid",BidGetCustomersContorller);
server.use("/api/bid",seqAnalysisContorller);
server.use("/api/BidUpdateDBContoller",BidUpdateDBContoller);



server.get("*", async (request, response)=>{
    response.status(404).json({message: "route not found"});
})
//Read bid files form BID directory
// setInterval(()=>BidReadFileController.executeReadBidFiles(),30000)
// BidReadFileController.executeReadBidFiles();
startAutoDBUpdate(INTERVAL_UPDATE_IN_HOURS)
console.log("INTERVAL_UPDATE_IN_HOURS", INTERVAL_UPDATE_IN_HOURS)
server.listen(3000,()=>{
console.log("We are listening to http://172.21.0.53:3000");
});

