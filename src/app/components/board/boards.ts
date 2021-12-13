export interface Board {
    id: string;
    name: string;
    prefs: any;
    shortLink: string;
}

export interface BoardCreate {
    defaultLists: boolean;
    name: string;
    prefs_background: string;
}