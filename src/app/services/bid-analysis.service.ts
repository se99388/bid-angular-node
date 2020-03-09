import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeqQuery } from '../models/seqQuery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidAnalysisService {

  constructor(private httpClient: HttpClient) { }

  public getAllBidsMatch(seqQuery: SeqQuery):Observable<any[]>{
    return this.httpClient.get<any[]>("http://172.21.0.53:3000/api/bid/seqAnalysis/"+ seqQuery.customer + "/" + seqQuery.seq + "/" + seqQuery.year + "/" + seqQuery.cutoff);
  }

}
