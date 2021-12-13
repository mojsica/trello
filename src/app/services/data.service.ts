import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board, BoardCreate } from '../components/models/models';

@Injectable()
export class DataService {

  key = '88d8ffd1ff7989bb66b0b85976b28395';
  token = '757f3f8d5079e0c1d0e553acb2fad9efe3ba4ddebd3e2a5280688b356dcc61aa';

  constructor(private http: HttpClient) { }

  public getAllBoards() {
    const url = `https://api.trello.com/1/member/me/boards?fields=name,prefs,shortLink&key=${this.key}&token=${this.token}`;
    let options = { headers: new HttpHeaders({ 'Content-type': 'aplication/json' }) };
    return this.http.get<Board[]>(url, options);
  }

  public getBoard(id: string) {
    const url = `https://api.trello.com/1/boards/${id}/?lists=open&cards=open&key=${this.key}&token=${this.token}`;
    let options = { headers: new HttpHeaders({ 'Content-type': 'aplication/json' }) };
    return this.http.get<Board>(url, options);
  }

  public updateBoardName(board: Board) {
    const url = `https://api.trello.com/1/boards/${board.id}/?&key=${this.key}&token=${this.token}`;
    return this.http.put<Board[]>(url, { name: board.name });
  }

  public deleteBoard(board: Board) {
    const url = `https://api.trello.com/1/boards/${board.id}/?&key=${this.key}&token=${this.token}`;
    return this.http.delete<any>(url);
  }

  public createBord(bordCreate: BoardCreate) {
    const url = `https://api.trello.com/1/boards/?name=${bordCreate.name}&key=${this.key}&token=${this.token}`;
    return this.http.post<Board>(url, bordCreate);
  }

  public createList(list: any) {
    const url = `https://api.trello.com/1/lists?idBoard=${list.idBoard}&name=${list.name}&key=${this.key}&token=${this.token}`;
    return this.http.post<any>(url, list);
  }

  public updateListName(list: any) {
    const url = `https://api.trello.com/1/lists/${list.id}/?&key=${this.key}&token=${this.token}`;
    return this.http.put<any>(url, { name: list.name });
  }

  public archiveList(list: any) {
    const url = `https://api.trello.com/1/lists/${list.id}/?&key=${this.key}&token=${this.token}`;
    return this.http.put<any>(url, { closed: true });
  }

  public archiveAllCardsInList(list: any) {
    const url = `https://api.trello.com/1/lists/${list.id}/archiveAllCards/?&key=${this.key}&token=${this.token}`;
    let options = { headers: new HttpHeaders({ 'Content-type': 'aplication/json' }) };
    return this.http.post<any>(url, options);
  }

  public createNewCard(card: any) {
    const url = `https://api.trello.com/1/cards/?idList=${card.idList}/?&key=${this.key}&token=${this.token}`;
    return this.http.post<any>(url, card);
  }

  public updateCard(card: any) {
    console.log('mojsa primer', card);
    const url = `https://api.trello.com/1/cards/${card.id}/?&key=${this.key}&token=${this.token}`;
    return this.http.put<any>(url, card);
  }

  /* Radi ne koristim ga*/
  public getCard(id: string) {
    const url = `https://api.trello.com/1/cards/${id}/?key=${this.key}&token=${this.token}`;
    let options = { headers: new HttpHeaders({ 'Content-type': 'aplication/json' }) };
    return this.http.get<any>(url, options);
  }

  /* Radi ne koristim ga */
  public getList(id: string) {
    const url = `https://api.trello.com/1/lists/${id}/?cards=open&key=${this.key}&token=${this.token}`;
    let options = { headers: new HttpHeaders({ 'Content-type': 'aplication/json' }) };
    return this.http.get<any>(url, options);
  }
}
