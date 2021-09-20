import Customer from './customer.js';
import Player from './player.js';
import Input from './input.js';
import CollisionManager from './collision.js';

export default class Game
{
	constructor(stage)
	{
		this.stage=stage;
		this.customers=[];
		this.player = new Player(this.stage);
		this.input = new Input(this.player,this.stage);
		this.collisionManager = 
    	document.body.addEventListener('keydown', this.input.MovePlayer);
    	document.body.addEventListener('keyup', this.input.ResetIdle);
		this.SpawnCustomers();	
	}

	SpawnCustomers()
	{
		var availablePositions = [[50,427],[100,329],[120,232],[150,133]];
		var imagePaths = ["assets/customer0.png","assets/customer1.png"];
		var xLimits = [605,600,584,573];

		clearInterval(this.customerGenerator);
  		this.customerGenerator = setInterval(() => 
		{
  			var customersToSpawn = Math.floor(Math.random() * 3);
			for(let i=0;i<customersToSpawn;i++)
			{
				this.newCustomer = new Customer(availablePositions,imagePaths,xLimits,this.stage);
				this.customers.push(this.newCustomer);
			}
		}, 4000);
	}


}