import Game from './game.js';
import Input from './input.js';

export default class CollisionManager
{
	constructor(game)
	{
		this.game=game;
		this.stage=game.stage;
		this.customers = game.customers;
		this.input=game.input;
		this.cakes = game.input.cakes;
		this.player = game.player;
		this.HandleCollisions = this.HandleCollisions.bind(this);
		this.lifeLost=false; 
		this.levelWon=false;
		this.sfx_levelWon= new Audio();
		this.sfx_levelWon.src="Audio/OverFilled_SFX_Win.mp3";
	}

	HandleCollisions()
	{
		if(this.lifeLost===true)
		{
			return;
		}
		this.CheckIfCakeHitCustomer();
		this.CheckIfCakeHitPlayer();
		this.CheckIfCustomerReachedTheEnd();
		this.CheckIfCakeReachedTheEnd();
		this.CheckIfAllCustomersServed();
	}

	CheckIfCakeHitCustomer()
	{
		for(let i=0;i<this.customers.length;i++)
		{
			for(let j=0;j<this.cakes.length;j++)
			{
				if(this.customers[i].x>=this.cakes[j].cakeSprite.x && Math.abs(this.customers[i].y-this.cakes[j].cakeSprite.y)===50)
				{
					if(this.customers[i].customerType === this.cakes[j].cakeSprite.cakeIndex)
					{
						this.cakes[j].cakeSprite.tween[0].paused=true;
						this.stage.removeChild(this.cakes[j].cakeSprite);
		    	 		this.cakes.splice(this.cakes.indexOf(this.cakes[j]), 1);
		    	 		this.stage.removeChild(this.customers[i]);
		    	 		this.customers.splice(this.customers.indexOf(this.customers[i]), 1);
						this.game.score += 50;
						this.game.screenManager.ShowLivesAndScore(this.game.lives, this.game.score);
					}
					else
					{
						this.cakes[j].cakeSprite.thrownBack=true;
						this.cakes[j].cakeSprite.tween[0].paused=true;
						this.cakes[j].cakeSprite.tween.splice(0,this.cakes[j].cakeSprite.tween.length);
						this.cakes[j].cakeSprite.tween.push(createjs.Tween.get(this.cakes[j].cakeSprite, { loop: false }).to({ x: 1200 }, 1750, createjs.Ease.getPowInOut(1)));
					}		
				}
			}
		}
	}

	CheckIfCakeHitPlayer()
	{
		for(let i=0;i<this.cakes.length;i++)
		{
			if(this.cakes[i].cakeSprite.thrownBack===true && (this.cakes[i].cakeSprite.x>=this.player.playerSprite.x) && (Math.abs(this.cakes[i].cakeSprite.y-this.player.playerSprite.y)<=50))
			{
				this.cakes[i].cakeSprite.thrownBack=false;
				this.cakes[i].cakeSprite.tween[0].paused=true;
				this.stage.removeChild(this.cakes[i].cakeSprite);
				this.player.playerSprite.itemHeld=this.cakes[i];
				this.cakes.splice(this.cakes.indexOf(this.cakes[i]),1);
			}
			else if(this.cakes[i].cakeSprite.thrownBack===true && (this.cakes[i].cakeSprite.x>=820))
			{
				this.lifeLost=true;
				this.cakes[i].cakeSprite.tween[0].paused=true;
				this.stage.removeChild(this.cakes[i].cakeSprite);
				this.game.lives-=1;
				this.PauseGame();
			
			}
		}
	}

	PauseGame()
	{	
    	document.body.removeEventListener('keydown', this.input.MovePlayer);
    	document.body.removeEventListener('keyup', this.input.RestartIdle);
    	for(let i = 0;i<this.customers.length;i++)
    	{
    		this.customers[i].tweens[0].paused=true;
    	}
    	clearInterval(this.game.customerGenerator);
    	this.player.playerSprite.gotoAndPlay('scared');
		this.player.playerSprite.itemHeld = "undisturbed";
    	if(this.game.lives>0)
    	{
    		//show try again
    		setTimeout(()=>
    		{
    			this.stage.removeAllChildren();
    			this.game.screenManager.LifeLost();
				setTimeout(()=>
    			{
					this.game.score=0;
					this.game.screenManager.levelNum = 1;
    				this.game.Start();
    			},2000);
			},2000);
    	}
    	else
    	{
    		setTimeout(()=>
    		{
    			this.stage.removeAllChildren();
    			this.game.screenManager.GameOver();
				setTimeout(()=>
    			{
    				this.game.lives=3;
					this.game.score=0;
					this.game.screenManager.levelNum = 1;
    				// this.game.Start();
					this.stage.removeAllChildren();
					this.game.screenManager.DrawLevel("Controls");
					this.game.screenManager.DrawLevel("BackButton");
					var startScreenBgData =
					{
						images:['assets/Overfilled_RemoveBg.png'],
						frames:{width:1920,height:1080}
					};
					var startScreenBgSpriteSheet  = new createjs.SpriteSheet(startScreenBgData);
					var startScreenBg = new createjs.Sprite(startScreenBgSpriteSheet);
					[startScreenBg.scaleX,startScreenBg.scaleY]=[0.6947,0.695];
					[startScreenBg.x,startScreenBg.y]=[-160,-50];
					this.stage.addChild(startScreenBg);
					
    			},2000);
			},2000);
    	}
	}

	CheckIfCustomerReachedTheEnd()
	{
		for(let i =0;i<this.customers.length;i++)
		{
			if(this.customers[i].x >= 780)
			{
				this.lifeLost=true;
				this.game.lives-=1;
				this.PauseGame();
			}
		}
	}

	CheckIfCakeReachedTheEnd()
	{
		for(let i=0;i<this.cakes.length;i++)
		{
			if(this.cakes[i].cakeSprite.x<=155)
			{
				this.lifeLost=true;
				this.cakes[i].cakeSprite.tween[0].paused=true;
				this.stage.removeChild(this.cakes[i].cakeSprite);
				this.game.lives-=1;
				this.PauseGame();
			}
		}
	}

	CheckIfAllCustomersServed()
	{
		if(this.customers.length===1)
		{
			this.levelWon=true;
		}
		if(this.customers.length===0 && this.levelWon===true)
		{
			this.levelWon=false;
			this.sfx_levelWon.play();
			document.body.removeEventListener('keydown', this.input.MovePlayer);
    		document.body.removeEventListener('keyup', this.input.RestartIdle);
    		for(let i = 0;i<this.customers.length;i++)
    		{
    			this.customers[i].tweens[0].paused=true;
    		}
    		clearInterval(this.game.customerGenerator);
    		this.player.playerSprite.gotoAndPlay('dance');
			this.player.playerSprite.itemHeld = "undisturbed";
    		setTimeout(()=>
    		{
    			this.stage.removeAllChildren();
    			this.game.screenManager.LevelWon();
				setTimeout(()=>
    			{
    				this.game.Start();
    			},2000);
			},2000);
		}
	}
}