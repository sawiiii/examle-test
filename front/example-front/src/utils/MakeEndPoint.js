const makeEndPoint = (path = "") => {
  // eslint-disable-next-line no-undef
  return `${process.env.REACT_APP_BACKEND_ENDPOINT}${path}`;
};
export default makeEndPoint;
