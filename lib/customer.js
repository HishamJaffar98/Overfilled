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
		var customerImageSet= imagePaths[Math.floor(Math.random()*2)];
		var walkSpeed = (Math.floor(Math.random() * 5) + 5) * 1750;

	 	var customerData = 
	 	{
      		images: [customerImageSet],
      		frames: {width:80, height:65},
      		animations: {walkAngry:[0, 2, 'walkAngry', 0.05]}
    	};

    	var customerSpriteSheet = new createjs.SpriteSheet(customerData);
    	var customerSprite = new createjs.Sprite(customerSpriteSheet,"walkAngry");

    	const customerProperties = ['speed','x', 'y', 'scaleX', 'scaleY', 'tweens'];

    	const customerPropertiesValues =[walkSpeed,customerPosition[0],customerPosition[1],1,1, []];

	    for (let i = 0; i < customerProperties.length; i++) 
	    {
	      customerSprite[customerProperties[i]] = customerPropertiesValues[i];
	    }

    	createjs.Tween.get(customerSprite, { loop: false }).to({ x: xLimits[randomNumber] },
    							   walkSpeed,createjs.Ease.getPowInOut(1));

    	customerSprite.gotoAndPlay('walkAngry');

  	 	createjs.Ticker.addEventListener('tick', createjs.Tween);
  	 	this.stage.addChild(customerSprite);
    	createjs.Ticker.setFPS(60);
    	createjs.Ticker.addEventListener('tick', this.stage);
	}
}