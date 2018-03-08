function success(data) {
  return {
    "status": 1,
    "message": "success",
    "result": data
  }
}

function fail() {
  return {
    "status": 0,
    "message": "fail",
    "result": {
      "code|4": /[0-9]/,
      "error|15-18": /[a-zA-Z0-9]/,
      "message|15-18": /[a-zA-Z0-9]/,
      "detail|15-20": /[a-zA-Z0-9]/
    }
  };
}

module.exports = {
  "success": function (data) {
    return success(data);
  },
  "fail": function (data) {
    return fail(data);
  }
};
