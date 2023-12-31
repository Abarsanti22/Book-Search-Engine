
const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                data = await User.findOne({_id: context.user._id }).select('-__v -password');
                return data;
              }
              throw new AuthenticationError('Please login!');
          },
      },

Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
    login: async (parent, { email, password}) => {
        const user = await User.findOne({email});
        if (!user) {
            throw new AuthenticationError('Error!');
        }
        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect Password!');
        }
        const token = signToken(user);
        return { token, user };
    },
    saveBook: async (parent, { newBook }, context) => {
        if (context.user) {
          const user = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: newBook }},
            { new: true }
          );
          return user;
        }
        throw new AuthenticationError('Please login!');
      },
      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const user = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId }}},
            { new: true }
          );
          return user;
        }
        throw new AuthenticationError('Please login');
      },

}

    };

    module.exports = resolvers;
