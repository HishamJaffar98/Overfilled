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
		this.HandleCollisions = this.HandleCollisions.bind(this);
	}

	HandleCollisions()
	{
		this.CheckIfCakeHitCustomer();
	}

	CheckIfCakeHitCustomer()
	{
		for(let i=0;i<this.customers.length;i++)
		{
			for(let j=0;j<this.cakes.length;j++)
			{
				if(this.customers[i].x>=this.cakes[j].x && Math.abs(this.customers[i].y-this.cakes[j].y)===50)
				{
					if(this.customers[i].customerType===0 && (this.cakes[j].cakeIndex===0 || this.cakes[j].cakeIndex===1) )
					{
						this.cakes[j].tween[0].setPaused(true);
						this.stage.removeChild(this.cakes[j]);
		    	 		this.cakes.splice(this.cakes.indexOf(this.cakes[j]), 1);
					}

					else if(this.customers[i].customerType===1 && (this.cakes[j].cakeIndex===2 || this.cakes[j].cakeIndex===3) )
					{
						this.cakes[j].tween[0].setPaused(true);
						this.stage.removeChild(this.cakes[j]);
		    	 		this.cakes.splice(this.cakes.indexOf(this.cakes[j]), 1);
					}

					else
					{
						//throw cake back
					}		
				}
				else
				{
					console.log(this.cakes[j].cakeIndex);
				}
			}
		}
	}
}