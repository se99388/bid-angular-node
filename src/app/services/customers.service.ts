import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    constructor(private httpClient: HttpClient) { }

    public getAllCustomers(): Observable<Customer[]> {
        return this.httpClient.get<Customer[]>("http://172.21.0.53:3000/api/bid/allCustomers");
    }
}
