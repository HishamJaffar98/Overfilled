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
    	document.body.addEventListener('keydown', this.input.MovePlayer);
    	document.body.addEventListener('keyup', this.input.ResetIdle);
		this.SpawnCustomers();
		this.SpawnStations();
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
		}, 6000);
	}

	SpawnStations()
	{
		var imagePaths = ["assets/StationStrawberry.png","./assets/StationBlueberry.png","./assets/StationMango.png","./assets/StationMatcha.png"];
		var stationLocations =[[820,470],[800,360],[784,260],[773,160]];
		for(let i=0;i<imagePaths.length;i++)
		{
				var stationData =
				{
						images:[imagePaths[i]],
						frames:{width:80,height:80}
				};
				var stationSpriteSheet = new createjs.SpriteSheet(stationData);
				var stationSprite = new createjs.Sprite(stationSpriteSheet);

				[stationSprite.x,stationSprite.y]=stationLocations[i];
				this.stage.addChild(stationSprite);
		}
	}
}