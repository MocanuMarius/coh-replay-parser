var fs = require("fs");

module.exports = (files) => {
	let replayObjects = []
	for (var i = 0; i< files.length; i++ ) {
		let file = files[i]
		let data = fs.readFileSync('./replays/' + file)
		var hexData = Buffer.from(data, 'hex')
		replayObjects.push({
				hexData: hexData,
				name: file,
				ticks: 0
			})
	}
	return replayObjects
}
