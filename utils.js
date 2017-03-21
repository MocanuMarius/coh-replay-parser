var ticksNumber = 0;
var lastDataPBGAStart = null


module.exports = {
	parseTickAndReturnNewIndex: (tickSize) => {

		ticksNumber++;
	},

	cursorToLastDataLocation: (buff) => {
		var explicitBuffer = Buffer.from(['68','65','84', '65', '80', '66', '71', '65'], 'integer')
		return buff.lastIndexOf(explicitBuffer) + 8
	},
	// parseHeaderAndReturnIndexOfFirstTick: (buff) => {
	// 	versionIndexSkip = lastDataPBGAStart(buff) + 4
	// 	return readLittleEndianInt(/)
	//
	// },
	readLittleEndianInt: (buff, index) => {
		if ((index+4) >= buff.length ) { return -1 }
		else { return buff.readInt32LE(index, true) }
		}
	,
	readBigEndianInt: (buff, index) => {

		if ((index+4) >= buff.length ) { return -1 }
		else { return buff.readInt32BE(index, true) }
	}
	,
	skipVersionInfo: (cursor) => cursor + 4
	,
	skipHeaderInfo: (cursor, headerSize) => cursor + headerSize + 28
}
