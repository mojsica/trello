import { Injectable } from "@angular/core";

@Injectable()
export class SidenavService {
    
    private isSidenavOpen = false;

    public toggleState() {
        this.isSidenavOpen = !this.isSidenavOpen;
    }

    public getSidenavState() {
        return this.isSidenavOpen;
    }
}