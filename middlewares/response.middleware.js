const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  const result = res.locals.queryResult
  console.log(result)
  res.send(result)
  next();
};

export { responseMiddleware };
