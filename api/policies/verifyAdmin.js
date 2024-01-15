module.exports = (req, res, proceed) => {
  if (req.user.role.toLowerCase() !== "supervisor") {
    return res.status(404).json("Not found");
  } else {
    proceed();
  }
};
