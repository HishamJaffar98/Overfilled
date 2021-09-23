export default class Customer
{
	constructor(positions,imagePaths,xLimits,stage)
	{
		this.stage=stage;
		this.CreateCustomers(positions,imagePaths,xLimits);
	}

	CreateCustomers(positions,imagePaths,xLimits)
	{
		var randomNumber = Math.floor(Math.random()*4);
		var customerPosition = positions[randomNumber];
		var customerType = Math.floor(Math.random()*4);
		var customerImageSet= imagePaths[customerType];
		var walkSpeed = (Math.floor(Math.random() * 5) + 5) * 1750;

	 	var customerData = 
	 	{
      		images: [customerImageSet],
      		frames: {width:80, height:80},
      		animations: {walkAngry:[0, 0, 'walkAngry', 0.5]}
    	};

    	var customerSpriteSheet = new createjs.SpriteSheet(customerData);
    	this.customerSprite = new createjs.Sprite(customerSpriteSheet,"walkAngry");

    	const customerProperties = ['speed','x', 'y', 'scaleX', 'scaleY', 'tweens','customerType'];

    	const customerPropertiesValues =[walkSpeed, customerPosition[0], customerPosition[1], 1, 1, [], customerType];

	    for (let i = 0; i < customerProperties.length; i++) 
	    {
	      this.customerSprite[customerProperties[i]] = customerPropertiesValues[i];
	    }

    	this.customerSprite.tweens.push(createjs.Tween.get(this.customerSprite, { loop: false }).to({ x: xLimits[randomNumber] },
			walkSpeed,createjs.Ease.getPowInOut(1)));

    	this.customerSprite.gotoAndPlay('walkAngry');

  	 	this.stage.addChild(this.customerSprite);
	}
}