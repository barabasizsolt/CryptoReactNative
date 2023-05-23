import { ListItem } from "../ListItem";

export interface News extends ListItem {
    id: string;
    title: string;
    url: string;
    thumbnail: string,
    creator: string
}