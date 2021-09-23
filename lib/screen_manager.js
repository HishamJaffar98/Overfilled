import Game from "./game.js";

export default class ScreenManager 
{
	constructor(stage) 
	{
		this.stage = stage;

  		const BACKGROUND_IMAGE_DATA = 
  		{
  			images: ['assets/DinerBG_F.png'],
			frames: {width:1200, height:750}
		};
		const BGIMG_SPRITE_SHEET = new createjs.SpriteSheet(BACKGROUND_IMAGE_DATA);
		this.DinerImage = new createjs.Sprite(BGIMG_SPRITE_SHEET);

		const CONTROLS_IMAGE_DATA = 
  		{
  			images: ['assets/Instruction.png'],frames: 
			{width:1050, height:656}
		};
		const CTRLIMG_SPRITE_SHEET = new createjs.SpriteSheet(CONTROLS_IMAGE_DATA);
		this.ControlsImage = new createjs.Sprite(CTRLIMG_SPRITE_SHEET);
		[this.ControlsImage.x, this.ControlsImage.y] = [35, 0];

		[this.livesLeft, this.highScore, this.currentScore, this.levelNum] = [
			3, 0, 0, 1
		];
		this.text_font = '36px ARCADECLASSIC';
		this.text_color = '#0000CC';
		this.highscorePos = [260, 15]
		this.curscorePos = [560, 15]
		this.livestextPos = [760, 15]

		this.highScoreText = new createjs.Text(`High   Score: ${this.highScore}`,
		this.text_font, this.text_color
		);
		[this.highScoreText.x, this.highScoreText.y] = this.highscorePos;
		this.currentScoreText = new createjs.Text(`Score: ${this.currentScore}`,
		this.text_font, this.text_color
		);
		[this.currentScoreText.x, this.currentScoreText.y] = this.curscorePos;
		this.livesText = new createjs.Text('Lives:', this.text_font,
		this.text_color
		);

		[this.livesText.x, this.livesText.y] = this.livestextPos;

		const LIVES_DATA = {
			images: ['assets/life.png'],
			frames: {width:40, height:40},
		};
		this.lives = [];
		const SPRITE_SHEET = new createjs.SpriteSheet(LIVES_DATA);
		for(let i=0; i < 3; i++)
		{
			this.lives.push(new createjs.Sprite(SPRITE_SHEET));
		}
		[this.lives[0].x, this.lives[0].y] = [880, 15];
		[this.lives[1].x, this.lives[1].y] = [920, 15];
		[this.lives[2].x, this.lives[2].y] = [960, 15];
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
			// document.getElementById('CoverPicture').style.visibility='hidden';
			document.getElementById("Heading").style.color="white";
			this.game = new Game(this.stage, this);
			break;

			case "Controls":
			this.stage.addChild(this.ControlsImage);
			// document.getElementById('CoverPicture').style.visibility='hidden';
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
			// document.getElementById('CoverPicture').style.visibility='visible';
			break;

		}
	}

	LevelWon()
  	{
		this.levelNum += 1;
  		const LEVEL_WON_DATA = 
  		{
			images: ['assets/levelWon.png'],
			frames: {width:1200, height:750},
			animations: {show:[0, 0, 'show', 0.075]}
    	};
    	const LEVEL_WON_SPRITE_SHEET = new createjs.SpriteSheet(LEVEL_WON_DATA);
    	const LEVEL_WON = new createjs.Sprite(LEVEL_WON_SPRITE_SHEET, 'show');
    	// doubling the text to achieve a shadow effect
		const LEVEL_TEXT = new createjs.Text(`Level ${this.levelNum}`,
		'46px ARCADECLASSIC', '#FFFFFF'
	  );
	  [LEVEL_TEXT.x, LEVEL_TEXT.y] = [505, 355];
	  const LEVEL_TEXT_2 =  new createjs.Text(`Level ${this.levelNum}`,
		'46px ARCADECLASSIC', '#00b9fb'
	  );
	  [LEVEL_TEXT_2.x, LEVEL_TEXT_2.y] = [508, 358];
	  this.stage.addChild(LEVEL_WON, LEVEL_TEXT_2, LEVEL_TEXT);
  	}

	ShowLivesAndScore(lives, currentScore){
		this.highScore = currentScore > this.highScore ? currentScore : this.highScore;
		this.currentScore = currentScore;
		this.stage.removeChild(this.highScoreText);
		this.stage.removeChild(this.currentScoreText);
		this.stage.removeChild(this.livesText);
		this.highScoreText = new createjs.Text(`High   Score: ${this.highScore}`,
		  this.text_font, this.text_color
		);
		[this.highScoreText.x, this.highScoreText.y] = this.highscorePos;
		this.currentScoreText = new createjs.Text(`Score: ${this.currentScore}`,
		  this.text_font, this.text_color
		);
		[this.currentScoreText.x, this.currentScoreText.y] = this.curscorePos;
		
		this.stage.addChild(
			this.highScoreText, this.currentScoreText, this.livesText, 
		);
		this.livesLeft = lives;
		for(let i=0; i < 3; i++){
			this.stage.removeChild(this.lives[i]);
			if(this.livesLeft > i)
				this.stage.addChild(this.lives[i]);
		}
	}


	LifeLost() 
 	{
    	const LIFE_LOST_DATA = 
    	{
      		images: ['assets/lifeLost.png'],
      		frames: {width:1200, height:750},
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
      		frames: {width:1200, height:750},
      		animations: {show:[0, 0, 'show', 0.075]}
    	};
    	const LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
    	const LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET, 'show');
    	[LIFE_LOST.x, LIFE_LOST.scaleX] = [0, 1];
    	this.stage.addChild(LIFE_LOST);
  	}

}