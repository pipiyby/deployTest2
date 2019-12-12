'use strict';


/**
 * Delete record in software list
 * Gets entire monitored software list.
 *
 * correlationId String A tracking id provided by the calling application (optional)
 * returns masterList
 **/
exports.deleteSoftwareList = function(correlationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ready" : true,
  "readyAsOf" : "2018-08-07t15:12:22z"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get software list
 * Gets entire monitored software list.
 *
 * correlationId String A tracking id provided by the calling application (optional)
 * returns masterList
 **/
exports.getSoftwareList = function(correlationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ready" : true,
  "readyAsOf" : "2018-08-07t15:12:22z"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update software list
 * Gets entire monitored software list.
 *
 * correlationId String A tracking id provided by the calling application (optional)
 * returns masterList
 **/
exports.updateSoftwareList = function(correlationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ready" : true,
  "readyAsOf" : "2018-08-07t15:12:22z"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

