const commentController = require('./comments');
const commentServices = require('../services/comments');

jest.mock('../services/comments');

describe('Comment Controller', function() {
  describe('create', function() {
    it('returns the created comment', async function() {
      const request = {body: {}};
      const response = {json: jest.fn()};
      const comment = {text: 'Hello World'};
      commentServices.createComment.mockResolvedValueOnce(comment);
      await commentController.create(request, response);
      expect(response.json).toHaveBeenCalledWith(comment);
    });
  });
  describe('getComments', function() {
    it('finds the comment', async function() {
      const request = {params: {product: 'sgew8usd'}};
      const response = {json: jest.fn()};
      const comment = {text: 'Great product 10/10'};
      commentServices.findComments.mockResolvedValueOnce(comment);
      await commentController.getComments(request, response);
      expect(response.json).toHaveBeenCalledWith(comment);
    });
  });
});
