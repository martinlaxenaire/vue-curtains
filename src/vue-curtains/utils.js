export const generateUUID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const flattenDefaultParams = (params) => {
  const flattenedParams = {};

  Object.keys(params).forEach((param) => {
    if (params[param] && params[param].type) {
      flattenedParams[param] = params[param].default;
    } else {
      flattenedParams[param] = params[param];
    }
  });

  return flattenedParams;
};
