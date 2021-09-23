import ScreenManager from "./screen_manager.js";

window.onload=function()
{
	var bgm = new Audio();
	bgm.src = "Audio/MainTheme.mp3";
	setInterval(()=>bgm.play(), bgm.duration*1000+1000);
	bgm.play();
	var hoverButtonSound = new Audio();
	hoverButtonSound.src = "Audio/ButtonHoverSound.mp3";
	var buttons = document.querySelectorAll('button');
	const screenManager = new ScreenManager;
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


