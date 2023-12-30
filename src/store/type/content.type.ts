export interface IContent {
    id: number;
    title: string;
    description: string;
    content: string;
    assetList: {
        id: number;
        name: string;
        assetURL: string;
        tag: string;
    }[];
    categories: number[];
    view: number | 0;
    pending: boolean;
    comment: {
        id: number;
        content: string;
    }[];
    lastUpload: string;
}

export interface IContentBody {
    title: string;
    description: string;
    content: string;
    assetList: {
        name: string;
        assetURL: string;
        tag: string;
    }[];
    categories: { id: number }[];
}

export interface ICommentBody {
    content: string;
    post: { id: number }[];
}
export interface IUpdatePending {
    itemId: number;
    property: string;
    value: boolean;
}
// export interface IUpdateContentCateFormat {
//     itemId: number;
//     value: { id: number }[];
// }

// export interface IUpdateContentFormat {
//     itemId: number;
//     value: string;
// }

// export interface IUpdateContentImageFormat {
//     itemId: number;
//     value: {
//         name: string;
//         assetURL: string;
//         tag: string;
//     }[];
// }
