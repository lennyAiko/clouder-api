module.exports = (req, res, proceed) => {
  if (req.user.emailStatus.toLowerCase() !== "verified") {
    return res.status(401).json("Email not verified");
  } else {
    proceed();
  }
};
