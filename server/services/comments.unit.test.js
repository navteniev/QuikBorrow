const commentServices = require('./comments');
const Comment = require('../models/Comment');

jest.mock('../models/Comment');

describe('services/comments', function() {
  afterEach(function() {
    Comment.mockReset();
  });

  describe('createComment', function() {
    it('creates a new comment with the data and saves it', async function() {
      const data = {
        user: 'sdg8n6hs9',
        product: 'q3jiu3rh94',
        text: 'New comment',
        rating: 3,
      };
      await commentServices.createComment(data);
      expect(Comment).toHaveBeenCalledWith(data);
      expect(Comment.mock.instances[0].save).toHaveBeenCalled();
    });
  });

  describe('findComments', function() {
    it('finds a comment by productId', async function() {
      const id = 'q3jiu3rh94';
      await commentServices.findComments(id);
      expect(Comment.find).toHaveBeenCalledWith({product: id});
    });
  });
});
