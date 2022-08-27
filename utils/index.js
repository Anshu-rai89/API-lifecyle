const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("./constants");
module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log("Token", token, req.token, req.headers.authorization);
    const decoded = await jwt.verify(token, JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(403).json({
        success: false,
        data: {
          msg: "Please login Again.",
        },
      });
    }

    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      data: {
        msg: "Please login Again.",
      },
    });
  }
};

/**
 * When user a login req
 */
