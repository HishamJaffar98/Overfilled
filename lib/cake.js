export default class Cake
{
	constructor(cakeIndex)
	{
		var cakeImagePaths = ['./assets/CakeStrawberry.png','./assets/CakeBlueberry.png','./assets/CakeMango.png','./assets/CakeMatcha.png'];
		var cakeNames = ["Strawberry","Blueberry","Mango","Matcha"];

		this.cakeIndex=cakeIndex;
		this.name=cakeNames[this.cakeIndex];

		var cakeData=
		{
			images:[cakeImagePaths[this.cakeIndex]],
			frames:{width:96,height:96}
		};

		var cakeSpriteSheet = new createjs.SpriteSheet(cakeData);
		this.cakeSprite = new createjs.Sprite(cakeSpriteSheet);
		[this.cakeSprite.scaleX,this.cakeSprite.scaleY]=[0.5,0.5];
		this.cakeSprite.cakeIndex=this.cakeIndex;
		this.cakeSprite.tween=[];
	}

	Move()
	{
		this.cakeSprite.tween.push(createjs.Tween.get(this.cakeSprite, { loop: false }).to({ x: 0 }, 1750, createjs.Ease.getPowInOut(1)));
	}
}