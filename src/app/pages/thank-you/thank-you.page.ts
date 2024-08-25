import { Component, OnInit } from '@angular/core';
import { AppPage } from '../app-page';
import { ThankYouWidgetController } from './widgets/thank-you-widget-controller';
import { AppFlowService } from 'src/app/services/app-flow-service';
import { SoundService } from 'src/app/services/sound/sound-affect-service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
  providers: [ThankYouWidgetController]
})
export class ThankYouPage extends AppPage<ThankYouWidgetController> {

  private readonly appFlowService: AppFlowService;
  
  private readonly code: string;
  public Code() : string {
    return this.code;
  }

  constructor(_appFlowService: AppFlowService, _widgetController: ThankYouWidgetController, _soundService: SoundService) {
    super(_widgetController, _soundService);
    
    this.appFlowService = _appFlowService;
    this.code = this.appFlowService.getCode();
  }

  protected override onInit(): void { }
  protected override viewWillEnter(): void {  }
  protected override async viewDidEnter(): Promise<void> { }

  public async newOrder() : Promise<void> {
    await this.appFlowService.newOrder();
  }

  protected override viewDidLeave(): void { }
}
