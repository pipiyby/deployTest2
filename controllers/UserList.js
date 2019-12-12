'use strict';

var utils = require('../utils/writer.js');
var UserList = require('../service/UserListService');

module.exports.getUserList = function getUserList (req, res, next) {
  var correlationId = req.swagger.params['correlationId'].value;
  UserList.getUserList(correlationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
