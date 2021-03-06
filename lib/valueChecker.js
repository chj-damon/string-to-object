const Path = require("path");
const CustomLog = require("./helpers/CustomLog");
const ObjectConverter = require(".");
const StringOperations = require("./stringOperations");

const LOGGER = new CustomLog(Path.basename(__filename));

const valueStringCheck = (valueString) => {
  try {
    if (!isNaN(valueString)) {
      return valueStringToNumber(valueString);
    }

    if (valueString === "true" || valueString === "false") {
      return valueStringToBoolean(valueString);
    }

    if (valueString[0] === '"') {
      return valueStringToString(valueString);
    }

    if (valueString[0] === "{") {
      return valueStringToObject(valueString);
    }

    if (valueString[0] === "[") {
      return valueStringToArray(valueString);
    }

    return valueString;
  } catch (error) {
    LOGGER.error(error);
    throw new Error(error);
  }
};

function valueStringToNumber(numberString) {
  return parseFloat(numberString);
}

function valueStringToBoolean(booleanString) {
  if (booleanString === "true") return true;
  return false;
}

function valueStringToString(valueString) {
  valueString = valueString.replace(/['"`]+/g, "");
  return valueString.trim();
}

function valueStringToObject(valueString) {
  return ObjectConverter.convertObject(valueString);
}

function valueStringToArray(valueString) {
  const arrayString = StringOperations.prepareArrayString(valueString);
  return StringOperations.buildArray(arrayString);
}

exports.valueStringCheck = valueStringCheck;
