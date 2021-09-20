import Cake from './cake.js';

export default class Input
{
	constructor(player,stage)
	{
		this.player=player;
		this.stage=stage;
		this.MovePlayer = this.MovePlayer.bind(this);
		this.ResetIdle=this.ResetIdle.bind(this);
		this.pickingUp = false;
	}

	MovePlayer(e)
	{
		if(e.keyCode===38)
		{
			this.MoveUp();
		}
		else if(e.keyCode===40)
		{
			this.MoveDown();
		}
		else if(e.keyCode===39)
		{
			this.PickupItem();
		}
		else if(e.keyCode===37)
		{
			this.ThrowItem();
		}
	}

	ResetIdle(e)
	{
		if(this.pickingUp===true)
		{
			this.player.playerSprite.x-=150;
			this.pickingUp=false;
		}	
		this.player.playerSprite.gotoAndPlay("idle");
	}

	MoveUp()
	{
		switch(this.player.playerSprite.y)
		{
				case this.player.playerPositions[0][1]:
				[this.player.playerSprite.x,this.player.playerSprite.y]=this.player.playerPositions[1];
				break;

				case this.player.playerPositions[1][1]:
				[this.player.playerSprite.x,this.player.playerSprite.y]=this.player.playerPositions[2];
				break;

				case this.player.playerPositions[2][1]:
				[this.player.playerSprite.x,this.player.playerSprite.y]=this.player.playerPositions[3];
				break;

				case this.player.playerPositions[3][1]:
				[this.player.playerSprite.x,this.player.playerSprite.y]=this.player.playerPositions[0];
				break;
		}
	}

	MoveDown()
	{
		switch(this.player.playerSprite.y)
		{
			case this.player.playerPositions[0][1]:
			[this.player.playerSprite.x,this.player.playerSprite.y]=this.player.playerPositions[3];
			break;

			case this.player.playerPositions[1][1]:
			[this.player.playerSprite.x,this.player.playerSprite.y]=this.player.playerPositions[0];
			break;

			case this.player.playerPositions[2][1]:
			[this.player.playerSprite.x,this.player.playerSprite.y]=this.player.playerPositions[1];
			break;

			case this.player.playerPositions[3][1]:
			[this.player.playerSprite.x,this.player.playerSprite.y]=this.player.playerPositions[2];
			break;
		}
	}

	PickupItem()
	{
		this.pickingUp=true;
		this.player.playerSprite.x+=150;
		if(this.player.playerSprite.y===this.player.playerPositions[0][1])
		{
			this.player.playerSprite.gotoAndPlay("fill");
			this.player.playerSprite.itemHeld=new Cake(0);
		}
		else if(this.player.playerSprite.y===this.player.playerPositions[1][1])
		{
			this.player.playerSprite.gotoAndPlay("fill");
			this.player.playerSprite.itemHeld=new Cake(1);
		}
		else if(this.player.playerSprite.y===this.player.playerPositions[2][1])
		{
			this.player.playerSprite.gotoAndPlay("fill");
			this.player.playerSprite.itemHeld=new Cake(2);
		}
		else if(this.player.playerSprite.y===this.player.playerPositions[3][1])
		{
			this.player.playerSprite.gotoAndPlay("fill");
			this.player.playerSprite.itemHeld=new Cake(3);
		}
		console.log("The item is: " + this.player.playerSprite.itemHeld.name);	
	}

	ThrowItem()
	{
		if(this.player.playerSprite.itemHeld===undefined)
		{
			return;
		}

		this.player.playerSprite.gotoAndPlay("serve");
		[this.player.playerSprite.itemHeld.cakeSprite.x,this.player.playerSprite.itemHeld.cakeSprite.y] = [this.player.playerSprite.x,this.player.playerSprite.y+50];
		this.stage.addChild(this.player.playerSprite.itemHeld.cakeSprite);
		this.player.playerSprite.itemHeld.Move();
		this.player.playerSprite.itemHeld=undefined;
	}
}