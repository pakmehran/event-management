import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { SearchItemsComponent } from './search-items.component';
import { CommonService } from '../../common.service'
import { HttpClientModule } from '@angular/common/http';


/* Feature Components */
import { FormService }    from '../FormService/form.service';
import { AddItemsComponent } from './add-items/add-items.component';
import { UpdateItemsComponent } from './update-items/update-items.component';

import { AlertComponent } from '../_directives/index';
import { AlertService } from '../_services/index';

const Search_Items_Router: Routes = [
  {
    path: '',
    component: SearchItemsComponent
  },
  { path: 'addItem', component: AddItemsComponent },
  { path: 'updateItem/:id', component: UpdateItemsComponent }
]

export const searchItemsRouter = RouterModule.forChild(Search_Items_Router);

@NgModule({
  imports: [
    CommonModule,
    searchItemsRouter,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyDateRangePickerModule,
    HttpClientModule
  ],
  providers: [AlertService, CommonService, { provide: FormService, useClass: FormService }],
  declarations: [SearchItemsComponent, AddItemsComponent, UpdateItemsComponent, AlertComponent],
})
export class SearchItemsModule { }
