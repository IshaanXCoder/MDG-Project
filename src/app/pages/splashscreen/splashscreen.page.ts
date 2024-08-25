import { Component, OnInit } from '@angular/core';
import { AppFlowService } from 'src/app/services/app-flow-service';
import { SplashScreenWidgetController } from './widgets/splashscreen-widget-controller';
import { AppPage } from '../app-page';
import { CustomWidgetController } from 'src/app/widgets/custom-widget-controller';
import { SoundService } from 'src/app/services/sound/sound-affect-service';
import { FileManager } from 'src/app/services/file-management/file-manager';
import { ItemData } from 'src/app/Item/itemData';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
  providers: [SplashScreenWidgetController]
})
export class SplashscreenPage extends AppPage<SplashScreenWidgetController> {

  private readonly fileManager: FileManager;
  private readonly appFlowService: AppFlowService;

  constructor(_appFlowService: AppFlowService, _widgetController : SplashScreenWidgetController, _soundService: SoundService, fileManager: FileManager) { 
    super(_widgetController, _soundService);
    
    this.appFlowService = _appFlowService;
    this.fileManager = fileManager;
  }

  protected override onInit(): void { }
  protected override viewWillEnter(): void { }
  
  async afterViewInit(): Promise<void> { }

  protected override async viewDidEnter(): Promise<void> {
    /*const element = this.splash.nativeElement;
    if(element != undefined) {
      await this.animationController.toggleLogoAnimation(this.splash.nativeElement, async() => {
        await this.appFlowService.loadApplication();
      });
    }
    else {
      console.log('ERROR: splahshcreen undefined; loading application anyway.');
      await this.appFlowService.loadApplication();
    }*/
    
    await this.fileManager.writeInitialCommit();
    await this.appFlowService.loadApplication(); 
  }
   
  protected override viewDidLeave(): void { }
}