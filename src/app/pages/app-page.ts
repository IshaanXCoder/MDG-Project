import { Injectable, OnInit } from "@angular/core";

import { SoundService } from "../services/sound/sound-affect-service";
import { CustomWidgetController } from "../widgets/custom-widget-controller";

@Injectable()
export abstract class AppPage<widgets extends CustomWidgetController> implements OnInit {
  protected readonly soundService: SoundService;

  protected readonly widgetController: widgets;

  constructor(widgetController: CustomWidgetController, soundService: SoundService) {
    this.widgetController = widgetController as widgets;

    this.soundService = soundService;
  }
  
    ngOnInit(): void {
      this.onInit();
    }
    protected abstract onInit() : void;
  
    ionViewWillEnter() : void {
      this.widgetController.initialiseController();
      
      this.viewWillEnter();
    }
    protected abstract viewWillEnter() : void;
  
    async ionViewDidEnter() : Promise<void> {
      await this.viewDidEnter();
    }
    protected abstract viewDidEnter(): Promise<void>;
  
    ionViewDidLeave() : void {
      this.viewDidLeave();
    }
    protected abstract viewDidLeave() : void;
  
    protected async presentErrorAlert() : Promise<void> {
      //this.soundService.playSound(SoundEnum.error);
      await this.widgetController.presentErrorAlert();
    }
}