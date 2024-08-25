export abstract class Initilaiziable {
    private isInitialised: boolean = false;
    IsInitialised() : boolean {
        return this.isInitialised;
    }
  
    protected initialise(): void {
        if(this.isInitialised) {
            return;
        }
  
        this.isInitialised = true;
    }
}