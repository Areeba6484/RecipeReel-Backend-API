import {rateLimit} from 'express-rate-limit';

const apiRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false

});

export { apiRateLimit };
