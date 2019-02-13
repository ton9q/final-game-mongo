const User = require('./user.model');

exports.addUser = (req, res) => {
  User.find({ name: req.body.name }, (err, users) => {
    if (err) {
      res.status(400).json({
        error: 'Users not found',
      });
    }

    if (users.length === 0) {
      const user = new User({
        name: req.body.name,
        score: req.body.score,
      });

      user
        .save()
        .then(() => {
          res.json(user);
        })
        .catch(() => {
          res.status(500).json({
            error: 'User not added',
          });
        });
    } else {
      res.status(409).json({
        error: 'Nickname is not available',
      });
    }
  });
};

exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: 'Users not found',
      });
    }

    const usersReturn = users.sort((a, b) => b.score - a.score);

    return res.json(usersReturn);
  });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate({ name: req.body.name }, { score: req.body.score }, (err, user) => {
    if (err || user === null) {
      res.status(400).json({
        error: 'User not founded',
      });
    }

    res.json({
      message: 'User successufuly update',
    });
  });
};
