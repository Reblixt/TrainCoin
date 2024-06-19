import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import rateLimit from "express-rate-limit";

export const initializeSecurityServices = (app) => {
  app.use(ExpressMongoSanitize());
  app.use(xss());
  app.use(helmet());
  app.use(hpp());
  app.use(cors());
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 100,
    }),
  );
};
