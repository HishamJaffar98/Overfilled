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
		this.cakes=[];
	}

	MovePlayer(e)
	{
		if(this.player.playerSprite.itemHeld === "undisturbed")
			return;
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
		if(this.player.playerSprite.itemHeld === "undisturbed")
			return;
		if(this.pickingUp===true)
		{
			this.player.playerSprite.x-=150;
			this.pickingUp=false;
		}
		if(this.player.playerSprite.itemHeld===undefined)
			this.player.playerSprite.gotoAndPlay("idle");
		else{
			var cake_index = this.player.playerSprite.itemHeld.cakeIndex;
			if(cake_index === 0)
				this.player.playerSprite.gotoAndPlay("hold_straw");
			else if(cake_index === 1)
				this.player.playerSprite.gotoAndPlay("hold_blue");
			else if(cake_index === 2)
				this.player.playerSprite.gotoAndPlay("hold_mango");
			else if(cake_index === 3)
				this.player.playerSprite.gotoAndPlay("hold_matcha");
		}
	}

	MoveUp()
	{
		var sfx_PlayerMove = new Audio();
		sfx_PlayerMove.src = "Audio/OverFilled_SFX_PlayerMove.mp3";
		sfx_PlayerMove.play();
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
		var sfx_PlayerMove = new Audio();
		sfx_PlayerMove.src = "Audio/OverFilled_SFX_PlayerMove.mp3";
		sfx_PlayerMove.play();
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
		if(this.PickupItem===true)
		{
			return;
		}
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
	}

	ThrowItem()
	{
		if(this.player.playerSprite.itemHeld===undefined)
		{
			return;
		}
		var sfx_CakeSend = new Audio();
		sfx_CakeSend.src = "Audio/OverFilled_SFX_CakeSend.mp3";
		sfx_CakeSend.play();
		this.player.playerSprite.gotoAndPlay("serve");
		[this.player.playerSprite.itemHeld.cakeSprite.x,this.player.playerSprite.itemHeld.cakeSprite.y] = [this.player.playerSprite.x,this.player.playerSprite.y+50];
		this.stage.addChild(this.player.playerSprite.itemHeld.cakeSprite);
		this.player.playerSprite.itemHeld.Move();
		this.cakes.push(this.player.playerSprite.itemHeld);
		this.player.playerSprite.itemHeld=undefined;
	}
}