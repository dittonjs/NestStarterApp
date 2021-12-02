export const parseJwt = (token) => {
  if (!token) return {};
  const jwtPayload = JSON.parse(window.atob(token.split('.')[1]));
  return jwtPayload;
};
