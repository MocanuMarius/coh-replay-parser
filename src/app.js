require('dotenv').config()

var fs = require('fs')

var sutils = require("./utils")

const files = fs.readdirSync('./replays')
var replays = (require('./replays'))(files);
console.log("replays are")


const parseReplay = (replay) => {
	let buffer        = replay.hexData
	// Current cursor ( just a number of the index location in the hex buffer)
	let cursor        = sutils.cursorToLastDataLocation(buffer)
	// Skipping everything until DATAPBGA key when the actual metadata ends

	let headerSize    = sutils.readLittleEndianInt(buffer, sutils.skipVersionInfo(cursor) )

	cursor            = sutils.skipHeaderInfo(cursor, headerSize)
	// First tick size is after the header size somewhere at a fixed location

	let firstTickSize = sutils.readLittleEndianInt(buffer, cursor-4)

	// Start parsing ticks, with new size and jumping from one to the next based on next tick size
	recursivelyParseTicks(replay, buffer, cursor, firstTickSize)
}

const recursivelyParseTicks = (replay, buffer, cursor, tickSize ) => {

	// Parse current tick by taking values from current cursor index + ticket size
	// You can look for values matching actions here and do something with it

	var nextCursor = cursor + tickSize + 8
	replay.ticks++
	if ( tickSize == -1 ) { return }
	else { return recursivelyParseTicks(replay, buffer, nextCursor, sutils.readLittleEndianInt(buffer, cursor + tickSize + 4)) }
}

// MAIN ENTRY
replays.forEach((replay) => {
	parseReplay(replay)
	console.log("-"+ replay.name +  "\n\t | ticks - " + replay.ticks + " \n\t | seconds - ", replay.ticks / 8);
})
