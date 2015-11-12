var babel = require("babel-core");
var merge = require("babel-core/lib/helpers/merge");
var OptionManager = require(
  "babel-core/lib/transformation/file/options/option-manager"
);

var optsManager = new OptionManager();
var options = optsManager.init({
  filename: __filename,
  babelrc: true
});

module.exports = {
  process: function (src, filename) {
    // Ignore all files within node_modules
    // babel files can be .js, .es, .jsx or .es6
    if (filename.indexOf("node_modules") === -1 && babel.util.canCompile(filename)) {
      return babel.transform(src, merge({
        filename: filename,
        retainLines: true
      }, options)).code;
    }

    return src;
  }
};
