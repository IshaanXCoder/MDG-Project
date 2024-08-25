import { Directory, FileInfo, Filesystem } from "@capacitor/filesystem";

import { Injectable } from "@angular/core";

import { FoodItem } from "../../Item/item";
import { Initilaiziable } from "../../initializable";
import { MENU } from "./menu"

@Injectable()
export class FileManager extends Initilaiziable {
    private readonly initialCommit: string = "initial";
    private readonly filePath: string = 'something lmao';

    private items: FoodItem[] | undefined = undefined;

    constructor() {
        super();
        this.initialise();
    }

    public async writeInitialCommit() {
      try {
        await Filesystem.readFile({
          path: this.initialCommit,
          directory: Directory.Data,
        });
      }
      catch {
        await this.addItem(this.initialCommit, "True");
        
        for(let i: number = 0; i < MENU.menu.length; i++)
          await this.addItem(MENU.menu[i].name, MENU.menu[i]);
      }
    }

    public async loadItems(onFileReadCallback: (name: string, value: string) => void) : Promise<void> {
        await Filesystem.readdir({
            path: '',
            directory: Directory.Data
          }).then(async result => {
            const loaded: FileInfo[] = result.files;
      
            for(var i: number = 0; i < loaded.length; i++) {
              let current = loaded[i];

              let data = (await Filesystem.readFile({
                            path: current.uri
                          })).data;

              if(typeof data == "string")
                onFileReadCallback(current.name, data as string);
              else  {
                const reader = new FileReader();
        
                let result: string;
                reader.onload = function() {
                  onFileReadCallback(current.name, reader.result as string);
                }
                
                reader.readAsText(data as Blob);
              }
            }
        });
    }

    public async addItem(name: string, data: any) : Promise<boolean> {
        const json = JSON.stringify(data);
    
        await Filesystem.writeFile({
          path: name,
          directory: Directory.Data,
          data: btoa(json),
        });
    
        return true;
    }   
    
    public async deleteItem(name: string) : Promise<boolean> {
        await Filesystem.deleteFile({
          path: name,
          directory: Directory.Data
        });
    
        return true;
    }
}