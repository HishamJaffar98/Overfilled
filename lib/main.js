import ScreenManager from "./screen_manager.js";

window.onload=function()
{
	var startScreenBgData =
	{
		images:['assets/Overfilled_RemoveBg.png'],
		frames:{width:1920,height:1080}

	};
	var startScreenBgSpriteSheet  = new createjs.SpriteSheet(startScreenBgData);
	var startScreenBg = new createjs.Sprite(startScreenBgSpriteSheet);
	[startScreenBg.scaleX,startScreenBg.scaleY]=[0.6947,0.695];
	[startScreenBg.x,startScreenBg.y]=[-160,-50];

	this.stage = new createjs.Stage('robo-tapper-canvas');
	this.stage.addChild(startScreenBg);
	this.stage.update();
	createjs.Ticker.addEventListener('tick', this.stage);

	var hoverButtonSound = new Audio();
	hoverButtonSound.src = "Audio/ButtonHoverSound.mp3";
	var buttons = document.querySelectorAll('button');
	const screenManager = new ScreenManager(this.stage);
	document.getElementById('BackButton').style.visibility='hidden';

	function playHoverSound()
	{
		hoverButtonSound.play();
	}

	function checkForHover()
	{
		for(let i=0;i<buttons.length;i++)
		{
			buttons[i].addEventListener("mouseover",playHoverSound);
		}	
	}

	checkForHover();

	function checkForClick()
	{
		for(let i=0;i<buttons.length;i++)
		{
			buttons[i].addEventListener("click",function()	{
															  screenManager.DrawLevel(buttons[i].id);
															}
										);
		}	
	}

	checkForClick();							
}


