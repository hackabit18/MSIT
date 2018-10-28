const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://gmjatin:tonyshark@1998@ds143683.mlab.com:43683/babycare");

module.exports.User = require("./user");
module.exports.Message = require("./message");
