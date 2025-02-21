const adminMiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;
    // Check if the user is an admin

    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access Denied, User is not an admin" });
    }

    // return res.status(200).json({ message: "User is an admin", adminRole });
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = adminMiddleware;
