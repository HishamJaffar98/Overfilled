/* global createjs */
import { BARS } from './bar.js';

export default class CustomerManager {
  constructor(stage) {
    this.customers = [];
    this.stage = stage;
  }

  createCustomers() {
    const NUMBER_OF_CUSTOMERS = Math.floor(Math.random() * 3);
    for (let i = 0; i <= NUMBER_OF_CUSTOMERS; i++) {
      this.createCustomer();
    }
  }

  createCustomer() 
  {
    const RANDOM_SELECTOR = Math.floor(Math.random() * 3);
    const RANDOM_SPEED = ((Math.floor(Math.random() * 5) + 5) * 1750);
    const RANDOM_BAR_INDEX = Math.floor(Math.random() * 4);

    var IMAGE_PATHS = ['assets/cake0.png', 'assets/cake1.png', 'assets/cake2.png'];
      // var FRAME_DIMENSIONS = [{ width: 90, height: 75 }, { width: 80, height: 75 }];
    var FRAME_DIMENSIONS = [{ width: 75, height: 70 }];

    var CUSTOMER_DATA = {
        images: [IMAGE_PATHS[RANDOM_SELECTOR]],
        // frames: FRAME_DIMENSIONS[RANDOM_SELECTOR === 2 ? 0 : 1],
        frames: FRAME_DIMENSIONS[0],
        animations: {
          walk: [0, 0, 'walk', 0.05],
          walkAngry: [0, 0, 'walkAngry', 0.05],
          drink: [0, 0, false, 0.05]
        }
      };

    var CUSTOMER_SPRITE_SHEET = new createjs.SpriteSheet(CUSTOMER_DATA);
    var CUSTOMER = new createjs.Sprite(CUSTOMER_SPRITE_SHEET, 'walkAngry');

    var SETTERS = ['speed', 'barIndex', 'x', 'y', 'scaleX', 'scaleY', 'tweens', 'scoreValue'];

    var VALUES = [RANDOM_SPEED, RANDOM_BAR_INDEX, _bar.BARS[RANDOM_BAR_INDEX].posXLimits[0], _bar.BARS[RANDOM_BAR_INDEX].startPosY + 20,
                 _bar.BARS[RANDOM_BAR_INDEX].scale, _bar.BARS[RANDOM_BAR_INDEX].scale, [], 50];

    for (let i = 0; i < SETTERS.length; i++) {
      CUSTOMER[SETTERS[i]] = VALUES[i];
    }

    CUSTOMER.tweens.push(createjs.Tween.get(CUSTOMER, { loop: false }).to({ x: _bar.BARS[RANDOM_BAR_INDEX].posXLimits[1] + 30 }, RANDOM_SPEED, createjs.Ease.getPowInOut(1)));

    CUSTOMER.gotoAndPlay('walkAngry');

    this.customers.push(CUSTOMER);
    this.stage.addChild(CUSTOMER);
  }

}
