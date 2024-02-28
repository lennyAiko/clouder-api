module.exports = async function (req, res, proceed) {
  if (
    req.url.includes("/leaderships") ||
    req.url.includes("/teaching") ||
    req.url.includes("/quality") ||
    req.url.includes("/research")
  ) {
    if (req.user.plan === "trial") {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
  }
  proceed();
};