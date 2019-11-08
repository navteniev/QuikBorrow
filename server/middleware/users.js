const expressValidator = {
  emailShouldExist: (shouldExist) => async (value, {req}) => {
    const user = await User.findOne({email: value}).exec();
    if (shouldExist && !user) {
      throw new Error('Email not found');
    } else if (!shouldExist && user) {
      throw new Error('Email already exists');
    }
    return true;
  },
  passwordMatchesHash: async (value, {req}) => {
    const matched = bcrypt.compare(value, req.user.password);
    if (!matched) {
      throw new Error('Incorrect password');
    }
    return true;
  },
  matches: (value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Passwords don\'t match');
    }
    return true;
  },
};

module.exports = {
  expressValidator,
};
