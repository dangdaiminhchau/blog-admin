export interface IWebInfo {
    id: number;
    name: string;
    content: string;
    assetList: {
        id: number;
        assetURL: string;
        tag: string;
        name: string;
    }[];
}

export interface IWebInfoBody {
    name: string;
    content: string;
    assetList: {
        assetURL: string;
        tag: string;
        name: string;
    }[];
}

export interface IFormatUpdateWebInfo {
    itemId: number;
    property: string;
    value: string;
}
