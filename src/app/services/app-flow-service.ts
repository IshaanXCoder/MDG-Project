import { Injectable, NgZone } from "@angular/core";

import { ItemService } from "./item-service";
import { Initilaisiable } from "../initialisable";

@Injectable()
export class AppFlowService extends Initilaisiable  {
    private applicationLoaded: boolean;
    
    private itemService : ItemService;

    constructor(_itemService: ItemService) {
        super();
        this.initialise();

        this.applicationLoaded = false;
        this.itemService = _itemService;
    }

    public loadApplication() {
        if(this.applicationLoaded)
            return;

        this.itemService.loadItems();
        
        this.applicationLoaded = this.itemService.IsInitialised();
    }
}

