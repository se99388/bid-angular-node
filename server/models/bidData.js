class BidData {
    constructor(id, date, rawData, sequence, folder, customer, number, seqId){
        this.id = id;
        this.date = date;
        this.rawData = rawData;
        this.sequence = sequence;
        this.folder = folder;
        this.customer = customer;
        this.number = number;
        this.seqId = seqId;
    }
}


module.exports = BidData

