/**
 * Created by Fyfar on 25.10.2014.
 */
exports.get = function (req, res, next) {
  res.render('error', {error: {message: "test"}});
};