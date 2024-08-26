import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ItemService } from './services/item-management/item-service';
import { AppFlowService } from './services/app-flow-service';
import { SoundService } from './services/sound/sound-affect-service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AppFlowService, ItemService, SoundService],
  bootstrap: [AppComponent],
})
export class AppModule { }
