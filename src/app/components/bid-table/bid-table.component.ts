import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../models/customer';
import { BidData } from '../../models/bidData';

@Component({
  selector: 'app-bid-table',
  templateUrl: './bid-table.component.html',
  styleUrls: ['./bid-table.component.css']
})
export class BidTableComponent implements OnInit {


public customer: Customer;
public showSpinner: boolean = true;

@Input()
public bidsDataOfTable: BidData[];
  constructor() { 

  }

  ngOnInit() {

  }
  

 
  

}
