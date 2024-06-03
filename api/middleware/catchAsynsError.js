export default (theFunc) => async (req, res, next) => {
  try {
    await theFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};
