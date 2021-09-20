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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(4);

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
					this.stage.addChild(this.DinerImage);
					this.stage.update();
					this.game = new _game2.default(this.stage);
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
	}]);

	return ScreenManager;
}();

exports.default = ScreenManager;

/***/ }),
/* 1 */
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
	}

	_createClass(Cake, [{
		key: 'Move',
		value: function Move() {
			createjs.Tween.get(this.cakeSprite, { loop: false }).to({ x: 0 }, 1750, createjs.Ease.getPowInOut(1));
		}
	}]);

	return Cake;
}();

exports.default = Cake;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollisionManager = function () {
	function CollisionManager() {
		_classCallCheck(this, CollisionManager);
	}

	_createClass(CollisionManager, [{
		key: "HandleCollisions",
		value: function HandleCollisions() {}
	}]);

	return CollisionManager;
}();

exports.default = CollisionManager;

/***/ }),
/* 3 */
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
			var customerImageSet = imagePaths[Math.floor(Math.random() * 2)];
			var walkSpeed = (Math.floor(Math.random() * 5) + 5) * 1750;

			var customerData = {
				images: [customerImageSet],
				frames: { width: 80, height: 65 },
				animations: { walkAngry: [0, 2, 'walkAngry', 0.05] }
			};

			var customerSpriteSheet = new createjs.SpriteSheet(customerData);
			var customerSprite = new createjs.Sprite(customerSpriteSheet, "walkAngry");

			var customerProperties = ['speed', 'x', 'y', 'scaleX', 'scaleY', 'tweens'];

			var customerPropertiesValues = [walkSpeed, customerPosition[0], customerPosition[1], 1, 1, []];

			for (var i = 0; i < customerProperties.length; i++) {
				customerSprite[customerProperties[i]] = customerPropertiesValues[i];
			}

			createjs.Tween.get(customerSprite, { loop: false }).to({ x: xLimits[randomNumber] }, walkSpeed, createjs.Ease.getPowInOut(1));

			customerSprite.gotoAndPlay('walkAngry');

			createjs.Ticker.addEventListener('tick', createjs.Tween);
			this.stage.addChild(customerSprite);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addEventListener('tick', this.stage);
		}
	}]);

	return Customer;
}();

exports.default = Customer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _customer = __webpack_require__(3);

var _customer2 = _interopRequireDefault(_customer);

var _player = __webpack_require__(7);

var _player2 = _interopRequireDefault(_player);

var _input = __webpack_require__(5);

var _input2 = _interopRequireDefault(_input);

var _collision = __webpack_require__(2);

var _collision2 = _interopRequireDefault(_collision);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(stage) {
		_classCallCheck(this, Game);

		this.stage = stage;
		this.customers = [];
		this.player = new _player2.default(this.stage);
		this.input = new _input2.default(this.player, this.stage);
		document.body.addEventListener('keydown', this.input.MovePlayer);
		document.body.addEventListener('keyup', this.input.ResetIdle);
		this.SpawnCustomers();
		this.SpawnStations();
	}

	_createClass(Game, [{
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
					_this.customers.push(_this.newCustomer);
				}
			}, 6000);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cake = __webpack_require__(1);

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
			console.log("The item is: " + this.player.playerSprite.itemHeld.name);
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
			this.player.playerSprite.itemHeld = undefined;
		}
	}]);

	return Input;
}();

exports.default = Input;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _screen_manager = __webpack_require__(0);

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
	}]);

	return Player;
}();

exports.default = Player;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map