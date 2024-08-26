import { Injectable } from "@angular/core";
import { ActionEnum } from "src/app/enums/action-enum";
import { RoleEnum } from "src/app/enums/role-enum";
import { AlertComponentOptions } from "src/app/widgets/app_alerts/alert-component-options";
import { AppAlert } from "src/app/widgets/app_alerts/app-alert";

import { CustomWidgetController } from "src/app/widgets/custom-widget-controller";
import { UIButton } from "src/app/widgets/uibutton";


@Injectable()
export class BillWidgetController extends CustomWidgetController {
  private readonly empty = "empty";

  protected initialiseWidgets(): void 
  {
    this.pushUIComponent(this.empty, new AppAlert()
    .init([ 
      new UIButton('Confirm', ActionEnum.confirm, RoleEnum.destructive)])
    .withOptions(new AlertComponentOptions('There are no items to check out', '', 'Press confirm to add items')));
  }

  async getEmptyResult() : Promise<string | undefined> {
    var component = this.getUIComponent(this.empty);
    if(component != undefined) {
      var result = await this.presentAlert(component);

      if(result == undefined) {
        return undefined;
      }

      return component.matchData(result);
    }
    return undefined;
  }
}