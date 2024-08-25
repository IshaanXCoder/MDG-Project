import { Injectable } from "@angular/core";

import { CustomWidgetController } from "src/app/widgets/custom-widget-controller";
import { ToastAlert } from "src/app/widgets/toasts/toast-alert";
import { ToastComponentOptions } from "src/app/widgets/toasts/toast-component-options";

@Injectable()
export class BillWidgetController extends CustomWidgetController {
  private readonly nodish = "nodish";

  protected initialiseWidgets(): void 
  {
    this.pushUIComponent(this.nodish, new ToastAlert()
      .withOptions(new ToastComponentOptions("This dish is not in cart", 1500)));
  }

  async presentNoDishToast() : Promise<void> {
    const component = this.getUIComponent(this.nodish);
    if(component != undefined) {
      await this.presentToast(component);
    }
  }
}