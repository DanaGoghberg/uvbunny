export class Bunny {
	totalPoints : number;
	players : Bunny[];
	carrots : number;
	lettuse : number;
	plays  : number;
    playsWithFriends : number;

    constructor(public name: string) {
		this.totalPoints = 0;
		this.players = []
		this.carrots = 0;
		this.lettuse = 0;
		this.plays = 0;
    	this.playsWithFriends=  0;
	}
}
