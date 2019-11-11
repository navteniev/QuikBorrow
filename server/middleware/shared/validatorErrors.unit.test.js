const validatorErrors = require('./validatorErrors');
const {validationResult} = require('express-validator');

jest.mock('express-validator');

/**
 * Mock Response function
 */
function Response() {
  this.status = jest.fn(() => this);
  this.json = jest.fn();
}

describe('middleware/shared/validatorErrors', function() {
  it('calls next if errors is empty', function() {
    const request = {};
    const response = new Response();
    const next = jest.fn();
    validationResult.mockReturnValueOnce({isEmpty: () => true});
    validatorErrors(request, response, next);
    expect(next).toHaveBeenCalled();
  });
  it('sends a 422 status and errors if errors is not empty', function() {
    const request = {};
    const response = new Response();
    const errorsArray = [{a: 1}, {b: 2}];
    const validation = {isEmpty: () => false, array: () => errorsArray};
    validationResult.mockReturnValueOnce(validation);
    validatorErrors(request, response);
    expect(response.status).toHaveBeenCalledWith(422);
    expect(response.json).toHaveBeenCalledWith({errors: errorsArray});
  });
});
