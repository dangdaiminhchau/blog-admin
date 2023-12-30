export interface IUser {
    id: number;
    username: string;
    email: string;
    role: string;
    assets: any[];
    Posts: any[];
    Comments: any[];
    Feedbacks: any[];
    authorities: { authority: string }[];
    enabled: boolean;
    description: null;
    display_name: string;
    feedbacks: any[];
    comments: any[];
    posts: any[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}
