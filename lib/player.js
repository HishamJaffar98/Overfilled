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
			images: ['./assets/player.png'],
      		frames: {width:140.5, height:156},
			animations: {idle:[0, 1, 'idle', 0.075],run:[2, 4, 'run', 0.125],fill:[5, 8, false, 0.3],serve:[9, 9, 'serve', 0.0000005],
			faceplant:[10, 10, true, 0.15],dance:[11, 12, 'dance', 0.065],scared:[13, 14, 'scared', 0.065]}
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

}