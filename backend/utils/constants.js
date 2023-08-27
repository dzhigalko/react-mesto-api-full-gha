const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const HTTP_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_UNAUTHORIZED = 401;
const HTTP_CONFLICT = 409;
const HTTP_FORBIDDEN = 403;
const UrlRegex = /^https?:\/\/[a-zA-Z][a-zA-Z0-9-_]*(\.[a-zA-Z0-9-_]+)+(\/[a-zA-Z0-9-_.]*)*$/;

module.exports = {
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_SERVER_ERROR,
  HTTP_CREATED,
  HTTP_UNAUTHORIZED,
  HTTP_CONFLICT,
  HTTP_FORBIDDEN,
  UrlRegex,
};
