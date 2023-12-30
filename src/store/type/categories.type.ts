import { IContent } from './content.type';

export interface ICategories {
    id: number;
    name: string;
    includedContents: IContent[] | [];
}

export interface IUpdateCateFormat {
    itemId: number;
    property: string;
    value: string;
}
