import Game from './game.js';
import Input from './input.js';

export default class CollisionManager
{
	constructor(game)
	{
		this.game=game;
		this.stage=game.stage;
		this.customers = game.customers;
		this.cakes = game.input.cakes;
		this.player = game.player;
		this.HandleCollisions = this.HandleCollisions.bind(this);
	}

	HandleCollisions()
	{
		this.CheckIfCakeHitCustomer();
		this.CheckIfCakeHitPlayer();
	}

	CheckIfCakeHitCustomer()
	{
		for(let i=0;i<this.customers.length;i++)
		{
			for(let j=0;j<this.cakes.length;j++)
			{
				if(this.customers[i].x>=this.cakes[j].cakeSprite.x && Math.abs(this.customers[i].y-this.cakes[j].cakeSprite.y)===50)
				{
					if(this.customers[i].customerType===0 && (this.cakes[j].cakeSprite.cakeIndex===0 || this.cakes[j].cakeSprite.cakeIndex===1) )
					{
						this.cakes[j].cakeSprite.tween[0].setPaused(true);
						this.stage.removeChild(this.cakes[j].cakeSprite);
		    	 		this.cakes.splice(this.cakes.indexOf(this.cakes[j]), 1);
		    	 		this.stage.removeChild(this.customers[i]);
		    	 		this.customers.splice(this.customers.indexOf(this.customers[i]), 1);
					}

					else if(this.customers[i].customerType===1 && (this.cakes[j].cakeSprite.cakeIndex===2 || this.cakes[j].cakeSprite.cakeIndex===3) )
					{
						this.cakes[j].cakeSprite.tween[0].setPaused(true);
						this.stage.removeChild(this.cakes[j].cakeSprite);
		    	 		this.cakes.splice(this.cakes.indexOf(this.cakes[j]), 1);
    	 		 		this.stage.removeChild(this.customers[i]);
		    	 		this.customers.splice(this.customers.indexOf(this.customers[i]), 1);
					}

					else
					{
						this.cakes[j].cakeSprite.thrownBack=true;
						createjs.Tween.get(this.cakes[j].cakeSprite, { loop: false }).to({ x: 960 }, 1750, createjs.Ease.getPowInOut(1));
					}		
				}
				else
				{
					//console.log(this.cakes[j].cakeIndex);
				}
			}
		}
	}

	CheckIfCakeHitPlayer()
	{
		for(let i=0;i<this.cakes.length;i++)
		{
			if(this.cakes[i].cakeSprite.thrownBack===true && (this.cakes[i].cakeSprite.x>=this.player.playerSprite.x))
			{
				this.cakes[i].cakeSprite.tween[0].setPaused(true);
				this.stage.removeChild(this.cakes[i].cakeSprite);
				//this.player.playerSprite.itemHeld=this.cakes[i];
    	 		this.cakes.splice(this.cakes.indexOf(this.cakes[i]), 1);
			}
		}
	}
}