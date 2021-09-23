import Customer from './customer.js';
import Player from './player.js';
import Input from './input.js';
import CollisionManager from './collision.js';

export default class Game
{
	constructor(stage,screenManager)
	{
		this.screenManager=screenManager;
		this.stage=stage;
		this.lives = 3;
		this.score = 0;
		const BACKGROUND_IMAGE_DATA = 
  		{
  			images: ['assets/DinerBG_F.png'],frames: {width:1200, height:750}
		};
		const BGIMG_SPRITE_SHEET = new createjs.SpriteSheet(BACKGROUND_IMAGE_DATA);
		this.DinerImage = new createjs.Sprite(BGIMG_SPRITE_SHEET);
		this.Start();
	}

	Start()
	{
		console.log(this.lives);
		this.stage.addChild(this.DinerImage);
		createjs.Ticker.setFPS(60);
    	createjs.Ticker.addEventListener('tick', this.stage);
  	 	createjs.Ticker.addEventListener('tick', createjs.Tween);
		this.customers=[];
		this.player = new Player(this.stage);
		this.input = new Input(this.player,this.stage);
		this.CollisionManager = new CollisionManager(this);
		createjs.Ticker.on('tick', this.CollisionManager.HandleCollisions);
    	document.body.addEventListener('keydown', this.input.MovePlayer);
    	document.body.addEventListener('keyup', this.input.ResetIdle);
		this.SpawnCustomers();
		this.SpawnStations();
		this.screenManager.ShowLivesAndScore(this.lives, this.score);
	}

	SpawnCustomers()
	{
		var availablePositions = [[150, 540], [175, 420], [200, 300], [225, 185]];
		var imagePaths = [	"assets/Customer_strawberry.png", "assets/Customer_blueberry.png", 
							"assets/Customer_mango.png", "assets/Customer_matcha.png"  ];
		var xLimits = [810, 810, 810, 810];

		var difficulty = 4000 - this.screenManager.levelNum*500;
		if(difficulty <= 1000)
			difficulty = 1000;
		var f = () =>
		{
			var customersToSpawn = 1 + Math.floor(Math.random() * this.screenManager.levelNum);
			for(let i=0; i<customersToSpawn;i++)
			{
				this.newCustomer = new Customer(availablePositions,imagePaths,xLimits,this.stage);
				this.customers.push(this.newCustomer.customerSprite);
			}
		}
		clearInterval(this.customerGenerator);
  		this.customerGenerator = setInterval(f, difficulty);
	}

	SpawnStations()
	{
		var imagePaths = ["assets/StationStrawberry.png","./assets/StationBlueberry.png","./assets/StationMango.png","./assets/StationMatcha.png"];
		var stationLocations =[[1045, 618], [1022, 480], [1005, 370], [990, 262]];
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