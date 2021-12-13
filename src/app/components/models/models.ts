export interface BoardCreate {
    defaultLists: boolean;
    name: string;
    prefs_background: string;
}
export interface Board {
    id: string;
    name: string;
    prefs: { backgroundColor: string; };
    shortLink: string;
    cards: Card[];
    lists: List[];
}
export interface ListCreate {
    idBoard: string;
    name: string;
    pos: number;
}
export interface List extends ListCreate {
    id: string;
    closed: boolean;
    cards?: Card[];
    addCardInputActive?: boolean;
}
export interface CardCreate {
    idList: string;
    name: string;
}
export interface Card extends CardCreate {
    id: string;
    idBoard: string;
    pos: number
}
