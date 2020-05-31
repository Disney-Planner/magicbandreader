// const { NFC } = require('nfc-pcsc');
// const nfc = new NFC(); // optionally you can pass logger

// console.log('loading')
// nfc.on('reader', reader => {

// 	console.log(`${reader.reader.name}  device attached`);

// 	// enable when you want to auto-process ISO 14443-4 tags (standard=TAG_ISO_14443_4)
// 	// when an ISO 14443-4 is detected, SELECT FILE command with the AID is issued
// 	// the response is available as card.data in the card event
// 	// see examples/basic.js line 17 for more info
//   // reader.aid = 'F222222222';
  

// 	reader.autoProcessing = false;
// 	reader.on('card', card => {

// 		// card is object containing following data
// 		// [always] String type: TAG_ISO_14443_3 (standard nfc tags like MIFARE) or TAG_ISO_14443_4 (Android HCE and others)
// 		// [always] String standard: same as type
// 		// [only TAG_ISO_14443_3] String uid: tag uid
// 		// [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

// 		console.log(`${reader.reader.name}  card detected`, card);

// 	});

// 	reader.on('card.off', card => {
// 		console.log(`${reader.reader.name}  card removed`, card);
// 	});

// 	reader.on('error', err => {
// 		console.log(`${reader.reader.name}  an error occurred`, err);
// 	});

// 	reader.on('end', () => {
// 		console.log(`${reader.reader.name}  device removed`);
// 	});

// });

// nfc.on('error', err => {
// 	console.log('an error occurred', err);
// });
const chalk = require('chalk');
const NfcpyId = require('node-nfcpy-id').default;
const nfc = new NfcpyId().start();
const player = require('play-sound')(opts = {});
const magicBandSound = './sounds/magic-band-sound.mp3';
 
nfc.on('touchstart', (card) => {
  console.log('MagicBand ID: ' + card.id);
  const magicBand = magicBands[card.id];
  console.log(magicBand.color(`this MagicBand belongs to: ${magicBand.name}`));
  // card.type is the same value as that of nfcpy.
  // 2: Mifare
  // 3: FeliCa
  // 4: Mifare (DESFire)
  console.log('MagicBand Type: ' + card.type);
  player.play(magicBandSound);
});
 
// If the `mode` is `loop` or `non-loop`, event will occur when the card is removed
nfc.on('touchend', () => {
  console.log('MagicBand was away.');
});
 
nfc.on('error', (err) => {
  // standard error output (color is red)
  console.error('\u001b[31m', err, '\u001b[0m');
});

const magicBands = {
  '04191b1a056680': { name: 'daddy', color: chalk.yellow },
  '0465573a076680': { name: 'mommy', color: chalk.blueBright},
  '04388502076680': { name: 'willow', color: chalk.redBright },
  '04943cba426480': { name: 'sebastian', color: chalk.blue },
};

const pixel = require("node-pixel");
const five = require("johnny-five");
 
const opts = {};

const board = new five.Board(opts);
let strip = null;

const fps = 20;

board.on("ready", function() {
 
    strip = new pixel.Strip({
        data: 6,
        length: 8,
        color_order: pixel.COLOR_ORDER.GRB,
        board: this,
        controller: "FIRMATA",
    });
 
    strip.on("ready", function() {
      console.log("Strip ready, let's go");

      var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
      var current_colors = [0,1,2,3,4];
      var current_pos = [0,1,2,3,4];
      var blinker = setInterval(function() {

          strip.color("#000"); // blanks it out

          for (var i=0; i< current_pos.length; i++) {
              if (++current_pos[i] >= strip.length) {
                  current_pos[i] = 0;
                  if (++current_colors[i] >= colors.length) current_colors[i] = 0;
              }
              strip.pixel(current_pos[i]).color(colors[current_colors[i]]);
          }

          strip.show();
      }, 1000/fps);
    });
});
//sudo apt-get install python-usb python-pip -y
//sudo pip install -U nfcpy-id-reader