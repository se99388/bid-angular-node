import { Component, OnInit } from '@angular/core';
import { BidService } from '../../services/bid.service';
import { CountBids } from '../../models/countBids';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public countBids: CountBids;
  public count = 0;
  constructor(private bidService: BidService) {

  }

  ngOnInit() {
    const updateDB = () => {
      // this.bidService.deleteDataBaseBid().subscribe(response => {
      //   console.log("response", response)
      // },
      //   err => {
      //     console.log(err)
      //   },
      //   () => {
      //     console.log("complete");
      //     this.bidService.updateDataBaseBid().subscribe(response=>{
      //       console.log(response)
      //       this.bidService.getCountOfAllBids().subscribe((countBidsResponse) => {
      //         console.log(countBidsResponse)

      //         this.countBids = countBidsResponse[0];
      //         console.log(this.countBids)
      //       });
      //     })

      //     setTimeout(updateDB, 10000);

      //   });
      console.log("count:", this.count += 1);

    }
    // this.bidService.updateDataBaseBid().subscribe(response => {
    //   console.log("response", response)
    // },
    //   err => {
    //     console.log(err)
    //   },
    //   () => {
    //     console.log("complete");
    //       this.bidService.getCountOfAllBids().subscribe((updatedBidStatus) => {
    //         // console.log("updatedBidStatus", updatedBidStatus)

    //         this.countBids = updatedBidStatus;
    //         console.log("updatedBidStatus",this.countBids)
    //       });
    //   });
    this.bidService.getCountOfAllBids().subscribe((updatedBidStatus) => {

      this.countBids = updatedBidStatus;
      console.log("updatedBidStatus", this.countBids)
    });
    // setTimeout(updateDB, 10000)

  }


}
