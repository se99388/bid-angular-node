import { Component, OnInit, Input } from '@angular/core';
import { MatchSeq } from '../../models/matchSeq';

@Component({
  selector: 'app-bid-match-table',
  templateUrl: './bid-match-table.component.html',
  styleUrls: ['./bid-match-table.component.css']
})
export class BidMatchTableComponent implements OnInit {

  constructor() { }
@Input()
public bidsDataOfTable: MatchSeq[];

ngOnInit() {
  console.log("bidsDataOfTable",this.bidsDataOfTable)
  }

}
