const fs = require("fs-extra");
const path = require("path");

const usersPath = path.join(__dirname, "..", "data", "users.json");
const tablePath = path.join(__dirname, "..", "data", "table.json");

function readJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) {
      if (fallback !== undefined) {
        fs.outputJsonSync(filePath, fallback, { spaces: 2 });
        return fallback;
      }
      return null;
    }
    return fs.readJsonSync(filePath);
  } catch (error) {
    console.error("Failed to read", filePath, error);
    return fallback ?? null;
  }
}

function writeJson(filePath, data) {
  fs.outputJsonSync(filePath, data, { spaces: 2 });
}

function getUsers() {
  return readJson(usersPath, []);
}

function loadTable() {
  return readJson(tablePath, null);
}

function saveTable(state) {
  writeJson(tablePath, state);
}

module.exports = {
  getUsers,
  loadTable,
  saveTable,
  readJson,
  writeJson,
};
