const { writeJSON, readJSON } = require("fs-extra");

const readDB = async (filePath) => {
	try {
		const fileJSON = await readJSON(filePath);
		return fileJSON;
	} catch (error) {
		console.log("Read Db error", error);
	}
};

const writeDB = async (filePath, data) => {
	try {
		await writeJSON(filePath, data);
	} catch (error) {
		console.log("Write DB error", error);
	}
};

module.exports = {
	readDB,
	writeDB,
};
