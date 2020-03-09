import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from '../components/layout/layout.component';
import { BidMainComponent } from '../components/bid-main/bid-main.component';
import { MenuComponent } from '../components/menu/menu.component';
import { HomeComponent } from '../components/home/home.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { BidTableComponent } from '../components/bid-table/bid-table.component';
import { HeaderComponent } from '../components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule, MatSelectModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogMatchComponent } from '../components/dialog-match/dialog-match.component';
import { BidMatchTableComponent } from '../components/bid-match-table/bid-match-table.component';

@NgModule({
  declarations: [
    LayoutComponent,
    BidMainComponent,
    MenuComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    BidTableComponent,
    HeaderComponent,
    DialogMatchComponent,
    BidMatchTableComponent
  ],
  entryComponents: [DialogMatchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
