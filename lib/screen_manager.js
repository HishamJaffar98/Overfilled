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
			this.stage.addChild(this.DinerImage);
			this.stage.update();
			this.game = new Game(this.stage);
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
}