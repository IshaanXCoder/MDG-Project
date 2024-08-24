import { Injectable, NgZone } from "@angular/core";

import { JSONService } from "./json-service";

@Injectable()
export class AppFlowService  {
    private applicationLoaded: boolean;
    
    private jsonService : JSONService;

    constructor(_jsonService: JSONService) {
        this.applicationLoaded = false;

        this.jsonService = _jsonService;
    }

    public loadApplication() {
        if(this.applicationLoaded)
            return;

        var items = this.jsonService.LoadItems();
        if(items == undefined)
        {
            //error page and pass the error
            return;
        }

        this.applicationLoaded = true;
    }
}

