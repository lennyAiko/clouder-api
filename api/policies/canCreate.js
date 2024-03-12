module.exports = async function (req, res, proceed) {
  if (req.user) {
    const userFeatures = await Features.findOne({ owner: req.user.id });
    console.log(userFeatures);
    if (req.user.role.toLowerCase() === "basic") {
      if (userFeatures.logbooks === 12) return res.forbidden();
      if (userFeatures.leaderships === 10) return res.forbidden();
      proceed();
    }
    if (req.user.role.toLowerCase() === "premium") {
      if (userFeatures.logbooks === 80) return res.forbidden();
      if (userFeatures.leaderships === 10) return res.forbidden();
      proceed();
    }
  } else {
    return res.forbidden();
  }
};
