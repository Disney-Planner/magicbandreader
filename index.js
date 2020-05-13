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

const NfcpyId = require('node-nfcpy-id').default;
const nfc = new NfcpyId().start();
const player = require('play-sound')(opts = {});
const magicBandSound = './sounds/magic-band-sound.mp3';
 
nfc.on('touchstart', (card) => {
  console.log('Card ID: ' + card.id);
  console.log(`this card belongs to: ${magicBands[card.id]}`);
  // card.type is the same value as that of nfcpy.
  // 2: Mifare
  // 3: FeliCa
  // 4: Mifare (DESFire)
  console.log('Card Type: ' + card.type);
  player.play(magicBandSound);
});
 
// If the `mode` is `loop` or `non-loop`, event will occur when the card is removed
nfc.on('touchend', () => {
  console.log('Card was away.');
});
 
nfc.on('error', (err) => {
  // standard error output (color is red)
  console.error('\u001b[31m', err, '\u001b[0m');
});

const magicBands = {
  '04191b1a056680': 'daddy',
  '0465573a076680': 'mommy',
  '04388502076680': 'willow',
  '04943cba426480': 'sebastian',
};

//sudo apt-get install python-usb python-pip -y
//sudo pip install -U nfcpy-id-reader