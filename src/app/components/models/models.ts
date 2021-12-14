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
    cards: Card[];
    addCardInputActive?: boolean;
}
export interface CardCreate {
    idList: string;
    name: string;
}
export interface Card extends CardCreate {
    id: string;
    idBoard: string;
    pos: number;
    shortLink: string;
}

export interface ActionOnCard {
    appCreator: null;
    data: { 
        text: string; 
        board: { id: string, name: string, shortLink: string }
        card: { id: string, name: string, idShort: number, shortLink: string }
        list: { id: string, name: string }
    };
    date: string;
    id: string;
    idMemberCreator: string;
    limits: any;
    memberCreator: any;
    type: string;
}
