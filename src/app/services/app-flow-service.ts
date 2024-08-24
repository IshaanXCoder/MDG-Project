import { Injectable, NgZone } from "@angular/core";

import { ItemService } from "./item-service";

@Injectable()
export class AppFlowService  {
    private applicationLoaded: boolean;
    
    private jsonService : ItemService;

    constructor(_jsonService: ItemService) {
        this.applicationLoaded = false;

        this.jsonService = _jsonService;
    }

    public loadApplication() {
        if(this.applicationLoaded)
            return;

        if(!this.jsonService.Intialise())
        {
            //error page and pass the error
            return;
        }

        this.applicationLoaded = true;
    }
}

