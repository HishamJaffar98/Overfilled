export default class Player
{
	constructor(stage)
	{
		this.playerPositions = [[605,427],[600,329],[584,232],[573,133]];
		this.stage=stage;
		this.InitializePlayer();
	}

	InitializePlayer()
	{
		var playerData = 
		{
			images: ['./assets/Player.png'],
      		frames: {width:109, height:160}, 
			animations: {
				idle:[0, 1, 'idle', 0.075],
				fill:[2, 2, false, 0.5],
				serve:[3, 3, 'serve', 0.5],
				faceplant:[6, 6, true, 0.5],
				dance:[4, 5, 'dance', 0.065],
		// 		scared:[13, 14, 'scared', 0.065]
			}
		};
		var playerSpriteSheet = new createjs.SpriteSheet(playerData);
		this.playerSprite = new createjs.Sprite(playerSpriteSheet, 'idle');

		var setters = ['x','y','scaleX','scaleY','itemHeld'];
		var values = [this.playerPositions[0][0],this.playerPositions[0][1],1,1,undefined];

		for(let i=0;i<setters.length;i++)
		{
			this.playerSprite[setters[i]]=values[i];
		}

		this.stage.addChild(this.playerSprite);
	}

	// UpdateLives()
	// {
	// 	this.lives-=1;
	// }

}