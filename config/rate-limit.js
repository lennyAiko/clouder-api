module.exports.rateLimit = {
  windowMs: 5 * 60 * 1000, // 5mins
  max: 100, // 10 requests
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429
};
