const errArray = [
  'CastError',
  'ValidationError',
  'MissingSchemaError',
  'ValidatorError',
  'ObjectParameterError',
  'ObjectExpectedError',
];

function errStatus(err) {
  if (errArray.includes(err)) {
    return { errorCode: 400, errMessage: "invalid data passed to the methods for creating a card / user or updating a user's avatar / profile" };
  }
  return { errorCode: 500, errMessage: 'default error' };
}

module.exports = errStatus;
