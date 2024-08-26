import { Component } from '@angular/core';

import { AppPage } from '../app-page';

import { AppFlowService } from 'src/app/services/app-flow-service';
import { SoundService } from 'src/app/services/sound/sound-affect-service';

import { SplashScreenWidgetController } from './widgets/splashscreen-widget-controller';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
  providers: [SplashScreenWidgetController]
})
export class SplashscreenPage extends AppPage<SplashScreenWidgetController> {

  constructor(appFlowService: AppFlowService, widgetController : SplashScreenWidgetController, soundService: SoundService) { 
    super(appFlowService, widgetController, soundService);
  }

  protected override onInit(): void { }
  protected override viewWillEnter(): void { }
  
  async afterViewInit(): Promise<void> { }

  protected override async viewDidEnter(): Promise<void> {
    await this.appFlowService.loadApplication(); 
  }
   
  protected override viewDidLeave(): void { }
}