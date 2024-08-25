import { Injectable } from "@angular/core";

import { CustomWidgetController } from "src/app/widgets/custom-widget-controller";

@Injectable()
export class ThankYouWidgetController extends CustomWidgetController {
  private readonly nodish = "nodish";

  protected initialiseWidgets(): void { }
}