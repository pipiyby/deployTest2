'use strict';


/**
 * Get user list and user software list based on admin id
 *
 * correlationId String A tracking id provided by the calling application (optional)
 * returns userList
 **/
exports.getUserList = function(correlationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "clientBalance" : {
    "records" : [ {
      "accountNumber" : "634346334",
      "balance" : 3453434,
      "asOfDate" : "2018-03-14",
      "dayChangeAmt" : 234232,
      "dayChangePct" : 0.1,
      "accruedInterest" : 192984
    } ]
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

