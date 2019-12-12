'use strict';

var utils = require('../utils/writer.js');
var SoftwareMasterList = require('../service/SoftwareMasterListService');

module.exports.deleteSoftwareList = function deleteSoftwareList (req, res, next) {
  var correlationId = req.swagger.params['correlationId'].value;
  SoftwareMasterList.deleteSoftwareList(correlationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSoftwareList = function getSoftwareList (req, res, next) {
  var correlationId = req.swagger.params['correlationId'].value;
  SoftwareMasterList.getSoftwareList(correlationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSoftwareList = function updateSoftwareList (req, res, next) {
  var correlationId = req.swagger.params['correlationId'].value;
  SoftwareMasterList.updateSoftwareList(correlationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
