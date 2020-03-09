import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BidMainComponent } from '../components/bid-main/bid-main.component';
import { HomeComponent } from '../components/home/home.component';
import { BidTableComponent } from '../components/bid-table/bid-table.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    {
        path: "bid-main", component: BidMainComponent, children: [
            { path: "bid-table", component: BidTableComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
