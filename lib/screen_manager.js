import Game from "./game.js";

export default class ScreenManager 
{
	constructor() 
	{
  		this.stage = new createjs.Stage('robo-tapper-canvas');

  		const BACKGROUND_IMAGE_DATA = 
  		{
  			images: ['assets/DinerBG_F.png'],frames: {width:960, height:600}
		};
		const BGIMG_SPRITE_SHEET = new createjs.SpriteSheet(BACKGROUND_IMAGE_DATA);
		this.DinerImage = new createjs.Sprite(BGIMG_SPRITE_SHEET);

		const CONTROLS_IMAGE_DATA = 
  		{
  			images: ['assets/instructions.png'],frames: {width:960, height:600}
		};
		const CTRLIMG_SPRITE_SHEET = new createjs.SpriteSheet(CONTROLS_IMAGE_DATA);
		this.ControlsImage = new createjs.Sprite(CTRLIMG_SPRITE_SHEET);
   	}
  	DrawLevel(id)
	{
		var buttons = document.querySelectorAll('button');
		for(let i=0;i<buttons.length;i++)
		{
			buttons[i].style.visibility='hidden';
		}
		switch(id)
		{
			case "Start/Restart":
			this.game = new Game(this.stage,this);
			break;

			case "Controls":
			//this.stage.addChild(this.ControlsImage);
			document.getElementById('BackButton').style.visibility='visible';
			this.stage.update();
			break;

			case "Quit":
			close();
			break;

			case "BackButton":
			this.stage.removeChildAt(this.stage.getNumChildren()-1);
			this.stage.update();
			var initialButtons = document.getElementById('button-container').querySelectorAll('button');
			for(let i=0;i<initialButtons.length;i++)
			{
				initialButtons[i].style.visibility='visible';
			}
			break;

		}
	}

 	LifeLost() 
 	{
    	const LIFE_LOST_DATA = 
    	{
      		images: ['assets/lifeLost.png'],
      		frames: {width:960, height:600},
      		animations: {show:[0, 0, 'show', 0.075]}
    	};
    	const LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
    	const LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET, 'show');
    	[LIFE_LOST.x, LIFE_LOST.scaleX] = [0, 1];
    	this.stage.addChild(LIFE_LOST);
  	}

	GameOver() 
 	{
    	const LIFE_LOST_DATA = 
    	{
      		images: ['assets/gameOver.png'],
      		frames: {width:960, height:600},
      		animations: {show:[0, 0, 'show', 0.075]}
    	};
    	const LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
    	const LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET, 'show');
    	[LIFE_LOST.x, LIFE_LOST.scaleX] = [0, 1];
    	this.stage.addChild(LIFE_LOST);
  	}

  	LevelWon()
  	{
  		const LEVEL_WON_DATA = 
  		{
			images: ['assets/levelWon.png'],
			frames: {width:960, height:600},
			animations: {show:[0, 0, 'show', 0.075]}
    	};

    	const LEVEL_WON_SPRITE_SHEET = new createjs.SpriteSheet(LEVEL_WON_DATA);
    	const LEVEL_WON = new createjs.Sprite(LEVEL_WON_SPRITE_SHEET, 'show');
    	LEVEL_WON.scaleX = .9525;
    	this.stage.addChild(LEVEL_WON);
  	}
}