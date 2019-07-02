import { Bet } from './bet.model';

export interface AppUser{
    name : string,
    email : string,
    isAdmin : boolean,
    points : number;
    bets?: Bet[] 
}