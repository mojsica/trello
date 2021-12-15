import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataService } from "./data.service";

@Injectable()
export class AllBoardsDataService {
    
    allBoards$ = this.dataService.getAllBoards();
    bordsAreRefreshed = new Subject<boolean>();

    constructor(private dataService: DataService) { }

    public getAllBoards() {
        return this.allBoards$
    }

    public refreshAllBoards() {
        this.allBoards$ = this.dataService.getAllBoards();
        this.bordsAreRefreshed.next(true)
    }
}