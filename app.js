// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import { config } from 'dotenv';
// import express from 'express';
// import morgan from 'morgan';

// import errorMiddlware from './middlewares/error.middleware.js';
// import courseRoutes from './routes/course.Routes.js'
// import miscRoutes from './routes/miscellanous.routes.js'
// import paymentRoutes from './routes/payment.routes.js'
// import userRoutes from './routes/user.Routes.js'
// import blogRoutes from './routes/blog.Routes.js'; 
// import reviewRoutes from './routes/reviews.Routes.js';
// // import { captureIP } from './middleware/captureIP.js';

// config();

// const app = express();

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         preflightContinue: false,
//         optionsSuccessStatus: 204,
//         credentials: true,
//     })
//   );

// app.use(cookieParser());

// app.use(morgan('dev'));

// app.use('/ping',function(_req,res){
//     res.send('Pong');
// })

// app.use('/api/v1/user', userRoutes)
// app.use('/api/v1/course', courseRoutes)
// app.use('/api/v1/payments', paymentRoutes)
// app.use('/api/v1/blogs', blogRoutes); 
// app.use('/api/v1/reviews', reviewRoutes);
// app.use('/api/v1', miscRoutes);
// app.all('*',(_req,res)=>{
//     res.status(404).send('OOPS!!  404 page not found ')
// })
// app.use(errorMiddlware);

// export default app;

import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import errorMiddleware from './middlewares/error.middleware.js';
import courseRoutes from './routes/course.Routes.js';
import miscRoutes from './routes/miscellanous.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import blogRoutes from './routes/blog.Routes.js'; 
import userRoutes from './routes/user.Routes.js';

config(); // Load environment variables

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS to allow requests from your frontend
app.use(
  cors({
    origin: 'http://localhost:5000', // Using same origin in dev and production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// HTTP request logger
app.use(morgan('dev'));

// API Routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payments', paymentRoutes)
app.use('/api/v1/blogs', blogRoutes); 
// app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1', miscRoutes);

// Serve the frontend's static files from the 'dist' folder (both dev and prod)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the index.html file on any other route (for client-side routing)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use(errorMiddleware);

// Catch-all route for 404 errors
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!! 404 page not found');
});

export default app;
