import { Injectable } from "@angular/core";

@Injectable()
export class StyleService {
    private curentStyleColor = '';

    public setCurrentStyleColor(color: string): void {
        setTimeout(() => {
            this.curentStyleColor = color;            
        }, 0);
    }
    public getCurrentStyleColor() {
        return this.curentStyleColor;
    }
}