import './LoadEnv'; // Must be the first import
import app from './server';
import { logger } from './shared';

// Start the server
const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});
