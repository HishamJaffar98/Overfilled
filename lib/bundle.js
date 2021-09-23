/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _customer = __webpack_require__(5);

var _customer2 = _interopRequireDefault(_customer);

var _player = __webpack_require__(7);

var _player2 = _interopRequireDefault(_player);

var _input = __webpack_require__(1);

var _input2 = _interopRequireDefault(_input);

var _collision = __webpack_require__(4);

var _collision2 = _interopRequireDefault(_collision);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(stage, screenManager) {
		_classCallCheck(this, Game);

		this.screenManager = screenManager;
		this.stage = stage;
		this.lives = 3;
		this.customerSpawnRate = 2200;
		var BACKGROUND_IMAGE_DATA = {
			images: ['assets/DinerBG_F.png'], frames: { width: 1200, height: 750 }
		};
		var BGIMG_SPRITE_SHEET = new createjs.SpriteSheet(BACKGROUND_IMAGE_DATA);
		this.DinerImage = new createjs.Sprite(BGIMG_SPRITE_SHEET);
		this.Start();
	}

	_createClass(Game, [{
		key: 'Start',
		value: function Start() {
			console.log(this.customerSpawnRate);
			this.stage.addChild(this.DinerImage);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addEventListener('tick', this.stage);
			createjs.Ticker.addEventListener('tick', createjs.Tween);
			this.customers = [];
			this.player = new _player2.default(this.stage);
			this.input = new _input2.default(this.player, this.stage);
			this.CollisionManager = new _collision2.default(this);
			createjs.Ticker.on('tick', this.CollisionManager.HandleCollisions);
			document.body.addEventListener('keydown', this.input.MovePlayer);
			document.body.addEventListener('keyup', this.input.ResetIdle);
			this.SpawnCustomers();
			this.SpawnStations();
			this.screenManager.ShowLivesAndScore();
		}
	}, {
		key: 'SpawnCustomers',
		value: function SpawnCustomers() {
			var _this = this;

			var availablePositions = [[150, 540], [175, 420], [200, 300], [225, 185]];
			var imagePaths = ["assets/Customer_strawberry.png", "assets/Customer_blueberry.png", "assets/Customer_mango.png", "assets/Customer_matcha.png"];
			var xLimits = [810, 810, 810, 810];

			clearInterval(this.customerGenerator);
			this.customerGenerator = setInterval(function () {
				var customersToSpawn = Math.floor(Math.random() * 3);
				for (var i = 0; i < customersToSpawn; i++) {
					_this.newCustomer = new _customer2.default(availablePositions, imagePaths, xLimits, _this.stage);
					_this.customers.push(_this.newCustomer.customerSprite);
				}
			}, this.customerSpawnRate);
		}
	}, {
		key: 'SpawnStations',
		value: function SpawnStations() {
			var imagePaths = ["assets/StationStrawberry.png", "./assets/StationBlueberry.png", "./assets/StationMango.png", "./assets/StationMatcha.png"];
			var stationLocations = [[1045, 618], [1022, 480], [1005, 370], [990, 262]];
			for (var i = 0; i < imagePaths.length; i++) {
				var stationData = {
					images: [imagePaths[i]],
					frames: { width: 80, height: 80 }
				};
				var stationSpriteSheet = new createjs.SpriteSheet(stationData);
				var stationSprite = new createjs.Sprite(stationSpriteSheet);

				var _stationLocations$i = _slicedToArray(stationLocations[i], 2);

				stationSprite.x = _stationLocations$i[0];
				stationSprite.y = _stationLocations$i[1];

				this.stage.addChild(stationSprite);
			}
		}
	}]);

	return Game;
}();

exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cake = __webpack_require__(3);

var _cake2 = _interopRequireDefault(_cake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = function () {
	function Input(player, stage) {
		_classCallCheck(this, Input);

		this.player = player;
		this.stage = stage;
		this.MovePlayer = this.MovePlayer.bind(this);
		this.ResetIdle = this.ResetIdle.bind(this);
		this.pickingUp = false;
		this.cakes = [];
	}

	_createClass(Input, [{
		key: "MovePlayer",
		value: function MovePlayer(e) {
			if (e.keyCode === 38) {
				this.MoveUp();
			} else if (e.keyCode === 40) {
				this.MoveDown();
			} else if (e.keyCode === 39) {
				this.PickupItem();
			} else if (e.keyCode === 37) {
				this.ThrowItem();
			}
		}
	}, {
		key: "ResetIdle",
		value: function ResetIdle(e) {
			if (this.pickingUp === true) {
				this.player.playerSprite.x -= 150;
				this.pickingUp = false;
			}
			if (this.player.playerSprite.itemHeld === undefined) this.player.playerSprite.gotoAndPlay("idle");else {
				var cake_index = this.player.playerSprite.itemHeld.cakeIndex;
				if (cake_index === 0) this.player.playerSprite.gotoAndPlay("hold_straw");else if (cake_index === 1) this.player.playerSprite.gotoAndPlay("hold_blue");else if (cake_index === 2) this.player.playerSprite.gotoAndPlay("hold_mango");else if (cake_index === 3) this.player.playerSprite.gotoAndPlay("hold_matcha");
			}
		}
	}, {
		key: "MoveUp",
		value: function MoveUp() {
			var sfx_PlayerMove = new Audio();
			sfx_PlayerMove.src = "Audio/OverFilled_SFX_PlayerMove.mp3";
			sfx_PlayerMove.play();
			switch (this.player.playerSprite.y) {
				case this.player.playerPositions[0][1]:
					var _player$playerPositio = _slicedToArray(this.player.playerPositions[1], 2);

					this.player.playerSprite.x = _player$playerPositio[0];
					this.player.playerSprite.y = _player$playerPositio[1];

					break;

				case this.player.playerPositions[1][1]:
					var _player$playerPositio2 = _slicedToArray(this.player.playerPositions[2], 2);

					this.player.playerSprite.x = _player$playerPositio2[0];
					this.player.playerSprite.y = _player$playerPositio2[1];

					break;

				case this.player.playerPositions[2][1]:
					var _player$playerPositio3 = _slicedToArray(this.player.playerPositions[3], 2);

					this.player.playerSprite.x = _player$playerPositio3[0];
					this.player.playerSprite.y = _player$playerPositio3[1];

					break;

				case this.player.playerPositions[3][1]:
					var _player$playerPositio4 = _slicedToArray(this.player.playerPositions[0], 2);

					this.player.playerSprite.x = _player$playerPositio4[0];
					this.player.playerSprite.y = _player$playerPositio4[1];

					break;
			}
		}
	}, {
		key: "MoveDown",
		value: function MoveDown() {
			var sfx_PlayerMove = new Audio();
			sfx_PlayerMove.src = "Audio/OverFilled_SFX_PlayerMove.mp3";
			sfx_PlayerMove.play();
			switch (this.player.playerSprite.y) {
				case this.player.playerPositions[0][1]:
					var _player$playerPositio5 = _slicedToArray(this.player.playerPositions[3], 2);

					this.player.playerSprite.x = _player$playerPositio5[0];
					this.player.playerSprite.y = _player$playerPositio5[1];

					break;

				case this.player.playerPositions[1][1]:
					var _player$playerPositio6 = _slicedToArray(this.player.playerPositions[0], 2);

					this.player.playerSprite.x = _player$playerPositio6[0];
					this.player.playerSprite.y = _player$playerPositio6[1];

					break;

				case this.player.playerPositions[2][1]:
					var _player$playerPositio7 = _slicedToArray(this.player.playerPositions[1], 2);

					this.player.playerSprite.x = _player$playerPositio7[0];
					this.player.playerSprite.y = _player$playerPositio7[1];

					break;

				case this.player.playerPositions[3][1]:
					var _player$playerPositio8 = _slicedToArray(this.player.playerPositions[2], 2);

					this.player.playerSprite.x = _player$playerPositio8[0];
					this.player.playerSprite.y = _player$playerPositio8[1];

					break;
			}
		}
	}, {
		key: "PickupItem",
		value: function PickupItem() {
			if (this.PickupItem === true) {
				return;
			}
			this.pickingUp = true;
			this.player.playerSprite.x += 150;
			if (this.player.playerSprite.y === this.player.playerPositions[0][1]) {
				this.player.playerSprite.gotoAndPlay("fill");
				this.player.playerSprite.itemHeld = new _cake2.default(0);
			} else if (this.player.playerSprite.y === this.player.playerPositions[1][1]) {
				this.player.playerSprite.gotoAndPlay("fill");
				this.player.playerSprite.itemHeld = new _cake2.default(1);
			} else if (this.player.playerSprite.y === this.player.playerPositions[2][1]) {
				this.player.playerSprite.gotoAndPlay("fill");
				this.player.playerSprite.itemHeld = new _cake2.default(2);
			} else if (this.player.playerSprite.y === this.player.playerPositions[3][1]) {
				this.player.playerSprite.gotoAndPlay("fill");
				this.player.playerSprite.itemHeld = new _cake2.default(3);
			}
		}
	}, {
		key: "ThrowItem",
		value: function ThrowItem() {
			if (this.player.playerSprite.itemHeld === undefined) {
				return;
			}
			var sfx_CakeSend = new Audio();
			sfx_CakeSend.src = "Audio/OverFilled_SFX_CakeSend.mp3";
			sfx_CakeSend.play();

			this.player.playerSprite.gotoAndPlay("serve");
			var _ref = [this.player.playerSprite.x, this.player.playerSprite.y + 50];
			this.player.playerSprite.itemHeld.cakeSprite.x = _ref[0];
			this.player.playerSprite.itemHeld.cakeSprite.y = _ref[1];

			this.stage.addChild(this.player.playerSprite.itemHeld.cakeSprite);
			this.player.playerSprite.itemHeld.Move();
			this.cakes.push(this.player.playerSprite.itemHeld);
			this.player.playerSprite.itemHeld = undefined;
		}
	}]);

	return Input;
}();

exports.default = Input;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenManager = function () {
	function ScreenManager(stage) {
		_classCallCheck(this, ScreenManager);

		this.stage = stage;

		var BACKGROUND_IMAGE_DATA = {
			images: ['assets/DinerBG_F.png'],
			frames: { width: 1200, height: 750 }
		};
		var BGIMG_SPRITE_SHEET = new createjs.SpriteSheet(BACKGROUND_IMAGE_DATA);
		this.DinerImage = new createjs.Sprite(BGIMG_SPRITE_SHEET);

		var CONTROLS_IMAGE_DATA = {
			images: ['assets/Instruction.png'], frames: { width: 900, height: 562 }
		};
		var CTRLIMG_SPRITE_SHEET = new createjs.SpriteSheet(CONTROLS_IMAGE_DATA);
		this.ControlsImage = new createjs.Sprite(CTRLIMG_SPRITE_SHEET);
		var _ref = [150, 20];
		this.ControlsImage.x = _ref[0];
		this.ControlsImage.y = _ref[1];
		var _ref2 = [3, 0, 0, 1];
		this.livesLeft = _ref2[0];
		this.highScore = _ref2[1];
		this.currentScore = _ref2[2];
		this.levelNum = _ref2[3];

		this.text_font = '36px ARCADECLASSIC';
		this.text_color = '#0000CC';
		this.highscorePos = [260, 15];
		this.curscorePos = [560, 15];
		this.livestextPos = [760, 15];

		this.highScoreText = new createjs.Text('High   Score: ' + this.highScore, this.text_font, this.text_color);

		var _highscorePos = _slicedToArray(this.highscorePos, 2);

		this.highScoreText.x = _highscorePos[0];
		this.highScoreText.y = _highscorePos[1];

		this.currentScoreText = new createjs.Text('Score: ' + this.currentScore, this.text_font, this.text_color);

		var _curscorePos = _slicedToArray(this.curscorePos, 2);

		this.currentScoreText.x = _curscorePos[0];
		this.currentScoreText.y = _curscorePos[1];

		this.livesText = new createjs.Text('Lives:', this.text_font, this.text_color);

		var _livestextPos = _slicedToArray(this.livestextPos, 2);

		this.livesText.x = _livestextPos[0];
		this.livesText.y = _livestextPos[1];


		var LIVES_DATA = {
			images: ['assets/life.png'],
			frames: { width: 40, height: 40 }
		};
		this.lives = [];
		var SPRITE_SHEET = new createjs.SpriteSheet(LIVES_DATA);
		for (var i = 0; i < 3; i++) {
			this.lives.push(new createjs.Sprite(SPRITE_SHEET));
		}
		var _ref3 = [880, 15];
		this.lives[0].x = _ref3[0];
		this.lives[0].y = _ref3[1];
		var _ref4 = [920, 15];
		this.lives[1].x = _ref4[0];
		this.lives[1].y = _ref4[1];
		var _ref5 = [960, 15];
		this.lives[2].x = _ref5[0];
		this.lives[2].y = _ref5[1];
	}

	_createClass(ScreenManager, [{
		key: 'DrawLevel',
		value: function DrawLevel(id) {
			var buttons = document.querySelectorAll('button');
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].style.visibility = 'hidden';
			}
			switch (id) {
				case "Start/Restart":
					var bgm = new Audio();
					bgm.src = "Audio/MainTheme.mp3";
					bgm.play();
					bgm.loop = true;
					document.getElementById("Heading").style.color = "white";
					this.game = new _game2.default(this.stage, this);
					break;

				case "Controls":
					this.stage.addChild(this.ControlsImage);
					document.getElementById('BackButton').style.visibility = 'visible';
					this.stage.update();
					break;

				case "Quit":
					close();
					break;

				case "BackButton":
					this.stage.removeChildAt(this.stage.getNumChildren() - 1);
					this.stage.update();
					var initialButtons = document.getElementById('button-container').querySelectorAll('button');
					for (var _i = 0; _i < initialButtons.length; _i++) {
						initialButtons[_i].style.visibility = 'visible';
					}
					break;

			}
		}
	}, {
		key: 'updateScore',
		value: function updateScore(currentScore) {
			this.highScore = currentScore > this.highScore ? currentScore : this.highScore;
			this.currentScore = currentScore;
			this.stage.removeChild(this.highScoreText);
			this.stage.removeChild(this.currentScoreText);
			this.highScoreText = new createjs.Text('High   Score: ' + this.highScore, this.text_font, this.text_color);

			var _highscorePos2 = _slicedToArray(this.highscorePos, 2);

			this.highScoreText.x = _highscorePos2[0];
			this.highScoreText.y = _highscorePos2[1];

			this.currentScoreText = new createjs.Text('Score: ' + this.currentScore, this.text_font, this.text_color);

			var _curscorePos2 = _slicedToArray(this.curscorePos, 2);

			this.currentScoreText.x = _curscorePos2[0];
			this.currentScoreText.y = _curscorePos2[1];

			this.stage.addChild(this.highScoreText, this.currentScoreText);
		}
	}, {
		key: 'updateLives',
		value: function updateLives(livesLeft) {
			this.stage.removeChild(this.livesText);
			this.stage.addChild(this.livesText);
			this.livesLeft = livesLeft;
			if (livesLeft < 3) {
				this.stage.removeChild(this.lives[2]);
			}
			if (livesLeft < 2) {
				this.stage.removeChild(this.lives[1]);
			}
			if (livesLeft < 1) {
				this.stage.removeChild(this.lives[0]);
			}
		}
	}, {
		key: 'levelWon',
		value: function levelWon() {
			var LEVEL_WON_DATA = {
				images: ['assets/levelWon.png'],
				frames: { width: 960, height: 600 }
			};
			var LEVEL_WON_SPRITE_SHEET = new createjs.SpriteSheet(LEVEL_WON_DATA);
			var LEVEL_WON = new createjs.Sprite(LEVEL_WON_SPRITE_SHEET);
			LEVEL_WON.scaleX = .9525;
			// doubling the text to achieve a shadow effect
			var LEVEL_TEXT = new createjs.Text('Level ' + this.levelNum, '46px ARCADECLASSIC', '#FFFFFF');
			var _ref6 = [385, 275];
			LEVEL_TEXT.x = _ref6[0];
			LEVEL_TEXT.y = _ref6[1];

			var LEVEL_TEXT_2 = newcreatejs.Text('Level ' + this.levelNum, '46px ARCADECLASSIC', '#00b9fb');
			var _ref7 = [388, 278];
			LEVEL_TEXT_2.x = _ref7[0];
			LEVEL_TEXT_2.y = _ref7[1];

			this.stage.addChild(LEVEL_WON, LEVEL_TEXT_2, LEVEL_TEXT);
			this.showLivesAndScore();
		}
	}, {
		key: 'lifeLost',
		value: function lifeLost() {
			var LIFE_LOST_DATA = {
				images: ['assets/lifeLost.png'],
				frames: { width: 960, height: 600 }
			};
			var LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
			var LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET);
			var _ref8 = [23, 0.9525];
			LIFE_LOST.x = _ref8[0];
			LIFE_LOST.scaleX = _ref8[1];

			this.stage.addChild(LIFE_LOST);
			this.showLivesAndScore();
		}
	}, {
		key: 'gameOver',
		value: function gameOver() {
			var GAME_OVER_DATA = {
				images: ['assets/gameOver.png'],
				frames: { width: 960, height: 600 }
			};
			var GAME_OVER_SPRITE_SHEET = new createjs.SpriteSheet(GAME_OVER_DATA);
			var GAME_OVER = new createjs.Sprite(GAME_OVER_SPRITE_SHEET);
			var _ref9 = [23, 0.9525];
			GAME_OVER.x = _ref9[0];
			GAME_OVER.scaleX = _ref9[1];

			this.stage.addChild(GAME_OVER);
			this.showLivesAndScore();
		}
	}, {
		key: 'ShowLivesAndScore',
		value: function ShowLivesAndScore() {
			var _stage;

			(_stage = this.stage).addChild.apply(_stage, [this.highScoreText, this.currentScoreText, this.livesText].concat(_toConsumableArray(this.lives.splice(0, this.livesLeft))));
		}
	}, {
		key: 'LifeLost',
		value: function LifeLost() {
			var LIFE_LOST_DATA = {
				images: ['assets/lifeLost.png'],
				frames: { width: 1200, height: 750 },
				animations: { show: [0, 0, 'show', 0.075] }
			};
			var LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
			var LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET, 'show');
			var _ref10 = [0, 1];
			LIFE_LOST.x = _ref10[0];
			LIFE_LOST.scaleX = _ref10[1];

			this.stage.addChild(LIFE_LOST);
		}
	}, {
		key: 'GameOver',
		value: function GameOver() {
			var LIFE_LOST_DATA = {
				images: ['assets/gameOver.png'],
				frames: { width: 1200, height: 750 },
				animations: { show: [0, 0, 'show', 0.075] }
			};
			var LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
			var LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET, 'show');
			var _ref11 = [0, 1];
			LIFE_LOST.x = _ref11[0];
			LIFE_LOST.scaleX = _ref11[1];

			this.stage.addChild(LIFE_LOST);
		}
	}, {
		key: 'LevelWon',
		value: function LevelWon() {
			var LEVEL_WON_DATA = {
				images: ['assets/levelWon.png'],
				frames: { width: 960, height: 600 },
				animations: { show: [0, 0, 'show', 0.075] }
			};

			var LEVEL_WON_SPRITE_SHEET = new createjs.SpriteSheet(LEVEL_WON_DATA);
			var LEVEL_WON = new createjs.Sprite(LEVEL_WON_SPRITE_SHEET, 'show');
			LEVEL_WON.scaleX = .9525;
			this.stage.addChild(LEVEL_WON);
		}
	}]);

	return ScreenManager;
}();

exports.default = ScreenManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cake = function () {
	function Cake(cakeIndex) {
		_classCallCheck(this, Cake);

		var cakeImagePaths = ['./assets/CakeStrawberry.png', './assets/CakeBlueberry.png', './assets/CakeMango.png', './assets/CakeMatcha.png'];
		var cakeNames = ["Strawberry", "Blueberry", "Mango", "Matcha"];

		this.cakeIndex = cakeIndex;
		this.name = cakeNames[this.cakeIndex];

		var cakeData = {
			images: [cakeImagePaths[this.cakeIndex]],
			frames: { width: 96, height: 96 }
		};

		var cakeSpriteSheet = new createjs.SpriteSheet(cakeData);
		this.cakeSprite = new createjs.Sprite(cakeSpriteSheet);
		var _ref = [0.5, 0.5];
		this.cakeSprite.scaleX = _ref[0];
		this.cakeSprite.scaleY = _ref[1];

		this.cakeSprite.cakeIndex = this.cakeIndex;
		this.cakeSprite.tween = [];
		this.cakeSprite.thrownBack = false;
	}

	_createClass(Cake, [{
		key: 'Move',
		value: function Move() {
			this.cakeSprite.tween.splice(0, this.cakeSprite.tween.length);
			this.cakeSprite.tween.push(createjs.Tween.get(this.cakeSprite, { loop: false }).to({ x: 0 }, 1750, createjs.Ease.getPowInOut(1)));
		}
	}]);

	return Cake;
}();

exports.default = Cake;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _input = __webpack_require__(1);

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollisionManager = function () {
	function CollisionManager(game) {
		_classCallCheck(this, CollisionManager);

		this.game = game;
		this.stage = game.stage;
		this.customers = game.customers;
		this.input = game.input;
		this.cakes = game.input.cakes;
		this.player = game.player;
		this.HandleCollisions = this.HandleCollisions.bind(this);
		this.lifeLost = false;
		this.levelWon = false;
		this.sfx_levelWon = new Audio();
		this.sfx_levelWon.src = "Audio/OverFilled_SFX_Win.mp3";
	}

	_createClass(CollisionManager, [{
		key: 'HandleCollisions',
		value: function HandleCollisions() {
			if (this.lifeLost === true) {
				return;
			}
			this.CheckIfCakeHitCustomer();
			this.CheckIfCakeHitPlayer();
			this.CheckIfCustomerReachedTheEnd();
			this.CheckIfCakeReachedTheEnd();
			this.CheckIfAllCustomersServed();
		}
	}, {
		key: 'CheckIfCakeHitCustomer',
		value: function CheckIfCakeHitCustomer() {
			for (var i = 0; i < this.customers.length; i++) {
				for (var j = 0; j < this.cakes.length; j++) {
					if (this.customers[i].x >= this.cakes[j].cakeSprite.x && Math.abs(this.customers[i].y - this.cakes[j].cakeSprite.y) === 50) {
						if (this.customers[i].customerType === this.cakes[j].cakeSprite.cakeIndex) {
							this.cakes[j].cakeSprite.tween[0].paused = true;
							this.stage.removeChild(this.cakes[j].cakeSprite);
							this.cakes.splice(this.cakes.indexOf(this.cakes[j]), 1);
							this.stage.removeChild(this.customers[i]);
							this.customers.splice(this.customers.indexOf(this.customers[i]), 1);
						} else {
							this.cakes[j].cakeSprite.thrownBack = true;
							this.cakes[j].cakeSprite.tween[0].paused = true;
							this.cakes[j].cakeSprite.tween.splice(0, this.cakes[j].cakeSprite.tween.length);
							this.cakes[j].cakeSprite.tween.push(createjs.Tween.get(this.cakes[j].cakeSprite, { loop: false }).to({ x: 1200 }, 1750, createjs.Ease.getPowInOut(1)));
						}
					}
				}
			}
		}
	}, {
		key: 'CheckIfCakeHitPlayer',
		value: function CheckIfCakeHitPlayer() {
			for (var i = 0; i < this.cakes.length; i++) {
				if (this.cakes[i].cakeSprite.thrownBack === true && this.cakes[i].cakeSprite.x >= this.player.playerSprite.x && Math.abs(this.cakes[i].cakeSprite.y - this.player.playerSprite.y) <= 50) {
					this.cakes[i].cakeSprite.thrownBack = false;
					this.cakes[i].cakeSprite.tween[0].paused = true;
					this.stage.removeChild(this.cakes[i].cakeSprite);
					this.player.playerSprite.itemHeld = this.cakes[i];
					this.cakes.splice(this.cakes.indexOf(this.cakes[i]), 1);
				} else if (this.cakes[i].cakeSprite.thrownBack === true && this.cakes[i].cakeSprite.x >= 820) {
					this.lifeLost = true;
					this.cakes[i].cakeSprite.tween[0].paused = true;
					this.stage.removeChild(this.cakes[i].cakeSprite);
					this.game.lives -= 1;
					this.PauseGame();
				}
			}
		}
	}, {
		key: 'PauseGame',
		value: function PauseGame() {
			var _this = this;

			document.body.removeEventListener('keydown', this.input.MovePlayer);
			document.body.removeEventListener('keyup', this.input.RestartIdle);
			for (var i = 0; i < this.customers.length; i++) {
				this.customers[i].tweens[0].paused = true;
			}
			clearInterval(this.game.customerGenerator);
			this.player.playerSprite.gotoAndPlay('scared');
			// alert("Lives remain: " + String(this.game.lives));
			if (this.game.lives > 0) {
				//show tryagain
				setTimeout(function () {
					_this.stage.removeAllChildren();
					_this.game.screenManager.LifeLost();
					setTimeout(function () {
						_this.game.Start();
					}, 2000);
				}, 2000);
			} else {
				setTimeout(function () {
					_this.stage.removeAllChildren();
					_this.game.screenManager.GameOver();
					setTimeout(function () {
						_this.game.lives = 3;
						_this.game.customerSpawnRate = 2200;
						_this.game.Start();
					}, 2000);
				}, 2000);
			}
		}
	}, {
		key: 'CheckIfCustomerReachedTheEnd',
		value: function CheckIfCustomerReachedTheEnd() {
			for (var i = 0; i < this.customers.length; i++) {
				if (this.customers[i].x >= 780) {
					// alert("Customer Hits End!");
					this.lifeLost = true;
					this.game.lives -= 1;
					this.PauseGame();
				}
			}
		}
	}, {
		key: 'CheckIfCakeReachedTheEnd',
		value: function CheckIfCakeReachedTheEnd() {
			for (var i = 0; i < this.cakes.length; i++) {
				if (this.cakes[i].cakeSprite.x <= 155) {
					this.lifeLost = true;
					this.cakes[i].cakeSprite.tween[0].paused = true;
					this.stage.removeChild(this.cakes[i].cakeSprite);
					this.game.lives -= 1;
					this.PauseGame();
				}
			}
		}
	}, {
		key: 'CheckIfAllCustomersServed',
		value: function CheckIfAllCustomersServed() {
			var _this2 = this;

			if (this.customers.length === 1) {
				this.levelWon = true;
			}
			if (this.customers.length === 0 && this.levelWon === true) {
				this.sfx_levelWon.play();
				this.levelWon = false;
				document.body.removeEventListener('keydown', this.input.MovePlayer);
				document.body.removeEventListener('keyup', this.input.RestartIdle);
				for (var i = 0; i < this.customers.length; i++) {
					this.customers[i].tweens[0].paused = true;
				}
				clearInterval(this.game.customerGenerator);
				this.player.playerSprite.gotoAndPlay('dance');
				setTimeout(function () {
					_this2.stage.removeAllChildren();
					_this2.game.screenManager.LevelWon();
					setTimeout(function () {
						_this2.game.customerSpawnRate -= 200;
						_this2.game.Start();
					}, 2000);
				}, 2000);
			}
		}
	}]);

	return CollisionManager;
}();

exports.default = CollisionManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Customer = function () {
	function Customer(positions, imagePaths, xLimits, stage) {
		_classCallCheck(this, Customer);

		this.stage = stage;
		this.CreateCustomers(positions, imagePaths, xLimits);
	}

	_createClass(Customer, [{
		key: 'CreateCustomers',
		value: function CreateCustomers(positions, imagePaths, xLimits) {
			var randomNumber = Math.floor(Math.random() * 4);
			var customerPosition = positions[randomNumber];
			var customerType = Math.floor(Math.random() * 4);
			var customerImageSet = imagePaths[customerType];
			var walkSpeed = (Math.floor(Math.random() * 5) + 5) * 1750;

			var customerData = {
				images: [customerImageSet],
				frames: { width: 80, height: 80 },
				animations: { walkAngry: [0, 0, 'walkAngry', 0.5] }
			};

			var customerSpriteSheet = new createjs.SpriteSheet(customerData);
			this.customerSprite = new createjs.Sprite(customerSpriteSheet, "walkAngry");

			var customerProperties = ['speed', 'x', 'y', 'scaleX', 'scaleY', 'tweens', 'customerType'];

			var customerPropertiesValues = [walkSpeed, customerPosition[0], customerPosition[1], 1, 1, [], customerType];

			for (var i = 0; i < customerProperties.length; i++) {
				this.customerSprite[customerProperties[i]] = customerPropertiesValues[i];
			}

			this.customerSprite.tweens.push(createjs.Tween.get(this.customerSprite, { loop: false }).to({ x: xLimits[randomNumber] }, walkSpeed, createjs.Ease.getPowInOut(1)));

			this.customerSprite.gotoAndPlay('walkAngry');

			this.stage.addChild(this.customerSprite);
		}
	}]);

	return Customer;
}();

exports.default = Customer;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _screen_manager = __webpack_require__(2);

var _screen_manager2 = _interopRequireDefault(_screen_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
	var startScreenBgData = {
		images: ['assets/Overfilled_RemoveBg.png'],
		frames: { width: 1920, height: 1080 }

	};
	var startScreenBgSpriteSheet = new createjs.SpriteSheet(startScreenBgData);
	var startScreenBg = new createjs.Sprite(startScreenBgSpriteSheet);
	var _ref = [0.6947, 0.695];
	startScreenBg.scaleX = _ref[0];
	startScreenBg.scaleY = _ref[1];
	var _ref2 = [-160, -50];
	startScreenBg.x = _ref2[0];
	startScreenBg.y = _ref2[1];


	this.stage = new createjs.Stage('robo-tapper-canvas');
	this.stage.addChild(startScreenBg);
	this.stage.update();
	createjs.Ticker.addEventListener('tick', this.stage);

	var hoverButtonSound = new Audio();
	hoverButtonSound.src = "Audio/ButtonHoverSound.mp3";
	var buttons = document.querySelectorAll('button');
	var screenManager = new _screen_manager2.default(this.stage);
	document.getElementById('BackButton').style.visibility = 'hidden';

	function playHoverSound() {
		hoverButtonSound.play();
	}

	function checkForHover() {
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("mouseover", playHoverSound);
		}
	}

	checkForHover();

	function checkForClick() {
		var _loop = function _loop(i) {
			buttons[i].addEventListener("click", function () {
				screenManager.DrawLevel(buttons[i].id);
			});
		};

		for (var i = 0; i < buttons.length; i++) {
			_loop(i);
		}
	}

	checkForClick();
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
	function Player(stage) {
		_classCallCheck(this, Player);

		this.playerPositions = [[820, 540], [795, 420], [785, 300], [780, 185]];
		this.stage = stage;
		this.InitializePlayer();
	}

	_createClass(Player, [{
		key: 'InitializePlayer',
		value: function InitializePlayer() {
			var playerData = {
				images: ['./assets/Player.png'],
				frames: { width: 109, height: 160 },
				animations: {
					idle: [0, 1, 'idle', 0.075],
					fill: [2, 2, false, 0.5],
					serve: [3, 3, 'serve', 0.5],
					faceplant: [6, 6, true, 0.5],
					dance: [4, 5, 'dance', 0.065],
					hold_straw: [7, 7, false, 0.5],
					hold_blue: [8, 8, false, 0.5],
					hold_mango: [9, 9, false, 0.5],
					hold_matcha: [10, 10, false, 0.5],
					scared: [11, 12, 'scared', 0.065]
				}
			};
			var playerSpriteSheet = new createjs.SpriteSheet(playerData);
			this.playerSprite = new createjs.Sprite(playerSpriteSheet, 'idle');

			var setters = ['x', 'y', 'scaleX', 'scaleY', 'itemHeld'];
			var values = [this.playerPositions[0][0], this.playerPositions[0][1], 1, 1, undefined];

			for (var i = 0; i < setters.length; i++) {
				this.playerSprite[setters[i]] = values[i];
			}

			this.stage.addChild(this.playerSprite);
		}

		// UpdateLives()
		// {
		// 	this.lives-=1;
		// }

	}]);

	return Player;
}();

exports.default = Player;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map