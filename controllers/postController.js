module.exports.home = async function (req, res) {
  return res.json({ msg: "Hello world" });
};

module.exports.createPost = async (req, res) => {
  return res.json({
    success: true,
    data: req.body,
  });
};
