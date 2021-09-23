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
		var BACKGROUND_IMAGE_DATA = {
			images: ['assets/DinerBG_F.png'], frames: { width: 960, height: 600 }
		};
		var BGIMG_SPRITE_SHEET = new createjs.SpriteSheet(BACKGROUND_IMAGE_DATA);
		this.DinerImage = new createjs.Sprite(BGIMG_SPRITE_SHEET);
		this.Start();
	}

	_createClass(Game, [{
		key: 'Start',
		value: function Start() {
			console.log(this.lives);
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
		}
	}, {
		key: 'SpawnCustomers',
		value: function SpawnCustomers() {
			var _this = this;

			var availablePositions = [[50, 427], [100, 329], [120, 232], [150, 133]];
			var imagePaths = ["assets/customer0.png", "assets/customer1.png"];
			var xLimits = [605, 600, 584, 573];

			clearInterval(this.customerGenerator);
			this.customerGenerator = setInterval(function () {
				var customersToSpawn = Math.floor(Math.random() * 3);
				for (var i = 0; i < customersToSpawn; i++) {
					_this.newCustomer = new _customer2.default(availablePositions, imagePaths, xLimits, _this.stage);
					_this.customers.push(_this.newCustomer.customerSprite);
				}
			}, 3000);
		}
	}, {
		key: 'SpawnStations',
		value: function SpawnStations() {
			var imagePaths = ["assets/StationStrawberry.png", "./assets/StationBlueberry.png", "./assets/StationMango.png", "./assets/StationMatcha.png"];
			var stationLocations = [[820, 470], [800, 360], [784, 260], [773, 160]];
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
			this.player.playerSprite.gotoAndPlay("idle");
		}
	}, {
		key: "MoveUp",
		value: function MoveUp() {
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenManager = function () {
  function ScreenManager() {
    _classCallCheck(this, ScreenManager);

    this.stage = new createjs.Stage('robo-tapper-canvas');

    var BACKGROUND_IMAGE_DATA = {
      images: ['assets/DinerBG_F.png'], frames: { width: 960, height: 600 }
    };
    var BGIMG_SPRITE_SHEET = new createjs.SpriteSheet(BACKGROUND_IMAGE_DATA);
    this.DinerImage = new createjs.Sprite(BGIMG_SPRITE_SHEET);

    var CONTROLS_IMAGE_DATA = {
      images: ['assets/instructions.png'], frames: { width: 960, height: 600 }
    };
    var CTRLIMG_SPRITE_SHEET = new createjs.SpriteSheet(CONTROLS_IMAGE_DATA);
    this.ControlsImage = new createjs.Sprite(CTRLIMG_SPRITE_SHEET);
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
          this.game = new _game2.default(this.stage, this);
          break;

        case "Controls":
          //this.stage.addChild(this.ControlsImage);
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
    key: 'LifeLost',
    value: function LifeLost() {
      var LIFE_LOST_DATA = {
        images: ['assets/lifeLost.png'],
        frames: { width: 960, height: 600 },
        animations: { show: [0, 0, 'show', 0.075] }
      };
      var LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
      var LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET, 'show');
      var _ref = [0, 1];
      LIFE_LOST.x = _ref[0];
      LIFE_LOST.scaleX = _ref[1];

      this.stage.addChild(LIFE_LOST);
    }
  }, {
    key: 'GameOver',
    value: function GameOver() {
      var LIFE_LOST_DATA = {
        images: ['assets/gameOver.png'],
        frames: { width: 960, height: 600 },
        animations: { show: [0, 0, 'show', 0.075] }
      };
      var LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
      var LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET, 'show');
      var _ref2 = [0, 1];
      LIFE_LOST.x = _ref2[0];
      LIFE_LOST.scaleX = _ref2[1];

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
						if (this.customers[i].customerType === 0 && (this.cakes[j].cakeSprite.cakeIndex === 0 || this.cakes[j].cakeSprite.cakeIndex === 1)) {
							this.cakes[j].cakeSprite.tween[0].paused = true;
							this.stage.removeChild(this.cakes[j].cakeSprite);
							this.cakes.splice(this.cakes.indexOf(this.cakes[j]), 1);
							this.stage.removeChild(this.customers[i]);
							this.customers.splice(this.customers.indexOf(this.customers[i]), 1);
						} else if (this.customers[i].customerType === 1 && (this.cakes[j].cakeSprite.cakeIndex === 2 || this.cakes[j].cakeSprite.cakeIndex === 3)) {
							this.cakes[j].cakeSprite.tween[0].paused = true;
							this.stage.removeChild(this.cakes[j].cakeSprite);
							this.cakes.splice(this.cakes.indexOf(this.cakes[j]), 1);
							this.stage.removeChild(this.customers[i]);
							this.customers.splice(this.customers.indexOf(this.customers[i]), 1);
						} else {
							this.cakes[j].cakeSprite.thrownBack = true;
							this.cakes[j].cakeSprite.tween[0].paused = true;
							this.cakes[j].cakeSprite.tween.splice(0, this.cakes[j].cakeSprite.tween.length);
							this.cakes[j].cakeSprite.tween.push(createjs.Tween.get(this.cakes[j].cakeSprite, { loop: false }).to({ x: 960 }, 1750, createjs.Ease.getPowInOut(1)));
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
				} else if (this.cakes[i].cakeSprite.thrownBack === true && this.cakes[i].cakeSprite.x >= 605) {
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
			if (this.game.lives > 0) {
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
						_this.game.Start();
					}, 2000);
				}, 2000);
			}
		}
	}, {
		key: 'CheckIfCustomerReachedTheEnd',
		value: function CheckIfCustomerReachedTheEnd() {
			for (var i = 0; i < this.customers.length; i++) {
				if (this.customers[i].x === 605 || this.customers[i].x === 600 || this.customers[i].x === 584 || this.customers[i].x === 573) {
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
				if (this.cakes[i].cakeSprite.x <= 50 || this.cakes[i].cakeSprite.x <= 100 || this.cakes[i].cakeSprite.x <= 120 || this.cakes[i].cakeSprite.x <= 130) {
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
				console.log("called");
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
			var customerType = Math.floor(Math.random() * 2);
			var customerImageSet = imagePaths[customerType];
			var walkSpeed = (Math.floor(Math.random() * 5) + 5) * 1750;

			var customerData = {
				images: [customerImageSet],
				frames: { width: 80, height: 65 },
				animations: { walkAngry: [0, 2, 'walkAngry', 0.05] }
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
	var hoverButtonSound = new Audio();
	hoverButtonSound.src = "Audio/ButtonHoverSound.mp3";
	var buttons = document.querySelectorAll('button');
	var screenManager = new _screen_manager2.default();
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

		this.playerPositions = [[605, 427], [600, 329], [584, 232], [573, 133]];
		this.stage = stage;
		this.InitializePlayer();
	}

	_createClass(Player, [{
		key: 'InitializePlayer',
		value: function InitializePlayer() {
			var playerData = {
				images: ['./assets/player.png'],
				frames: { width: 140.5, height: 156 },
				animations: { idle: [0, 1, 'idle', 0.075], run: [2, 4, 'run', 0.125], fill: [5, 8, false, 0.3], serve: [9, 9, 'serve', 0.0000005],
					faceplant: [10, 10, true, 0.15], dance: [11, 12, 'dance', 0.065], scared: [13, 14, 'scared', 0.065] }
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
	}, {
		key: 'UpdateLives',
		value: function UpdateLives() {
			this.lives -= 1;
		}
	}]);

	return Player;
}();

exports.default = Player;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map