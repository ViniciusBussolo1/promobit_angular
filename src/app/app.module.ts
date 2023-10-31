import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ItemsFilterComponent } from './items-filter/items-filter.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.modules';
import { DetailsComponent } from './details/details.component';

import { register } from 'swiper/element/bundle';

register();

@NgModule({
  declarations: [
    AppComponent,
    ItemsFilterComponent,
    MainComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
