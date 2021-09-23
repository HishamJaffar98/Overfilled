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
		// alert("Lives remain: " + String(this.game.lives));
    	if(this.game.lives>0)
    	{
    		//show tryagain
    		setTimeout(()=>
    		{
    			this.stage.removeAllChildren();
    			this.game.screenManager.LifeLost();
				setTimeout(()=>
    			{
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
    				this.game.Start();
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
				// alert("Customer Hits End!");
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
}