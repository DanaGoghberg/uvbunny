import { FieldValue } from 'firebase/firestore';

export class Bunny {
	totalPoints : any ;
	carrot : any ;
	lettuse : any ;
	playFirst  : any ;
    playFriend : any ;
	friends: any;

    constructor(public name: string) {
		this.totalPoints = 0;
		this.carrot = 0;
		this.lettuse = 0;
		this.playFirst = 0;
    	this.playFriend=  0;
		this.friends = [];
	}
}
