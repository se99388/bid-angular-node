import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import { BidService } from '../../services/bid.service';
import { BidData } from '../../models/bidData';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogMatchComponent } from '../dialog-match/dialog-match.component';
import { SeqQuery } from '../../models/seqQuery';
import { BidAnalysisService } from '../../services/bid-analysis.service';
import { MatchSeq } from '../../models/matchSeq';


@Component({
    selector: 'app-bid-main',
    templateUrl: './bid-main.component.html',
    styleUrls: ['./bid-main.component.css']
})
export class BidMainComponent implements OnInit {
    public customers: Customer[];
    public currentCustomer = new Customer();
    public bidsData: BidData[];
    public showSpinner: boolean = true;
    public query: SeqQuery;
    public allMatchSeqs: MatchSeq[];
    constructor(private customersService: CustomersService, private bidService: BidService, public dialog: MatDialog, private bidAnalysisService: BidAnalysisService) { }

    ngOnInit() {
        this.customersService.getAllCustomers().subscribe(customers => {
            this.customers = customers;
            this.showSpinner = false;
        });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(DialogMatchComponent, {
            width: '500px',
            data: { customer: this.currentCustomer.customer }
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result && result.seq) {
                this.showSpinner = true;
                this.bidsData = null;
                this.query = result;

                this.bidAnalysisService.getAllBidsMatch(result).subscribe((seqMatchResponse) => {
                    console.log("seqMatchResponse", seqMatchResponse);
                    this.allMatchSeqs = seqMatchResponse;
                    this.showSpinner = false;
                });

            }
            console.log('The dialog was closed', result);
        });
    }

    public getCustomer() {
        console.log("onchange working")
        this.showSpinner = true;
        this.bidService.getBidByCustomer(this.currentCustomer).subscribe(bidResponse => {
            console.log("bidResponse", bidResponse)
            this.bidsData = bidResponse;
            this.showSpinner = false;
            this.allMatchSeqs = null;
        });
    }

}
