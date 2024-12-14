import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './api/routes/taskRoutes.js';
import authRoutes from './api/routes/authRoutes.js';
import web3Routes from './api/routes/web3Routes.js'; // Update path for ES Modules
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI || 'mongodb://localhost/taskmanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use('/api/web3', web3Routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
