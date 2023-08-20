import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';
import type { ExpressMiddleware, SanitizeOptions } from '../types';
import { sanitize } from '../lib/sanitize.lib';

const xss = (options?: SanitizeOptions): ExpressMiddleware => {
  return (req, _res, next) => {
    req.body = sanitize(req.body, options);
    req.query = sanitize(req.query, options) as unknown as ParsedQs;
    req.params = sanitize(req.params, options) as unknown as ParamsDictionary;

    next();
  };
};

export default xss;
