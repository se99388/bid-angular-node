import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { BidData } from '../models/bidData';
import { CountBids } from '../models/countBids';

@Injectable({
  providedIn: 'root'
})
export class BidService {
    public customer: Customer;
    public countBids: CountBids;
    constructor(private httpClient: HttpClient) { 

       
    }

    public getBidByCustomer(customer:Customer): Observable<BidData[]> {

        return this.httpClient.get<BidData[]>("http://172.21.0.53:3000/api/bid/bidsByCustomer/" + customer.customer);
    }

    public getCountOfAllBids():Observable<CountBids>{
        return this.httpClient.get<CountBids>("http://172.21.0.53:3000/api/bid/countOfAllBids")
    }

    public updateDataBaseBid():Observable<CountBids>{
        return this.httpClient.get<any>("http://172.21.0.53:3000/api/BidUpdateDBContoller")
    }

    public deleteDataBaseBid():Observable<CountBids>{
        return this.httpClient.delete<any>("http://172.21.0.53:3000/api/BidReadFileController")
    }



    


}
