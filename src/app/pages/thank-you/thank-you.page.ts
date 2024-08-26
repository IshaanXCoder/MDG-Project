import { Component } from '@angular/core';

import { AppPage } from '../app-page';

import { ThankYouWidgetController } from './widgets/thank-you-widget-controller';

import { AppFlowService } from 'src/app/services/app-flow-service';
import { SoundEnum } from 'src/app/services/sound/enums/sound-enum';
import { SoundService } from 'src/app/services/sound/sound-affect-service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
  providers: [ThankYouWidgetController]
})
export class ThankYouPage extends AppPage<ThankYouWidgetController> {
  private readonly code: string;
  public Code() : string {
    return this.code;
  }

  constructor(appFlowService: AppFlowService, widgetController: ThankYouWidgetController, soundService: SoundService) {
    super(appFlowService, widgetController, soundService);
    
    this.code = this.appFlowService.getCode();
  }

  protected override onInit(): void { }
  protected override viewWillEnter(): void {  }
  protected override async viewDidEnter(): Promise<void> { }

  public async newOrder() : Promise<void> {
    await this.soundService.playSound(SoundEnum.success);
    await this.appFlowService.newOrder();
  }

  protected override viewDidLeave(): void { }
}
