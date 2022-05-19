import { FieldValue } from 'firebase/firestore';

export class Bunny {
	totalPoints : any ;
	carrots : any ;
	lettuse : any ;
	plays  : any ;
    playsWithFriends : any ;
	friends: any;

    constructor(public name: string) {
		this.totalPoints = 0;
		this.carrots = 0;
		this.lettuse = 0;
		this.plays = 0;
    	this.playsWithFriends=  0;
		this.friends = [];
	}
}
