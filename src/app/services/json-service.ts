import { Directory, FileInfo, Filesystem } from "@capacitor/filesystem";

import { Injectable } from "@angular/core";

import { FoodItem } from "../Item/item";
import { Initilaisiable } from "../initialisable";

@Injectable()
export class JSONService extends Initilaisiable {
    private readonly filePath: string = 'something lmao';

    private items: FoodItem[] | undefined = undefined;

    constructor() {
        super();
        this.initialise();
    }

    public async loadItems(onFileReadCallback: (name: string, value: string) => void) : Promise<void> {
        await Filesystem.readdir({
            path: '',
            directory: Directory.Data
          }).then(async result => {
            const loaded: FileInfo[] = result.files;
      
            for(var i: number = 0; i < loaded.length; i++) {
              let current = loaded[i];

              onFileReadCallback(current.name, atob((await Filesystem.readFile({
                path: current.uri
              })).data as string));
            }
        });
    }

    protected async addItem(name: string, foodItem: FoodItem) : Promise<boolean> {
        const json = JSON.stringify(foodItem);
    
        await Filesystem.writeFile({
          path: name,
          directory: Directory.Data,
          data: btoa(json),
        });
    
        return true;
    }   
    
    protected async deleteItem(name: string) : Promise<boolean> {
        await Filesystem.deleteFile({
          path: name,
          directory: Directory.Data
        });
    
        return true;
    }
}