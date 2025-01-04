const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use an environment variable for production

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URL
const mongoUrl = 'mongodb+srv://jegankjack121:12345@cluster0.qbb81tx.mongodb.net/learnapp'; // Change 'myDatabase' to your actual DB name

// Connect to MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch((e) => console.log(e));

// Define the User schema and model
const UserDetailSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  courseTitle: String, // Optional: Associate user with a course title
}, {
  collection: 'UserInfo'
});
const User = mongoose.model('UserInfo', UserDetailSchema);

// Define a Course schema and model
const courseSchema = new mongoose.Schema({
  name: String,
  category: String,
  logo: String,
});
const Course = mongoose.model('Course', courseSchema);

// Define a Video schema and model
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String, // URL or path to the video file
  courseTitle: String, // Store the course title instead of ID
});
const Video = mongoose.model('Video', videoSchema);

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Store user info in request
    next();
  });
};

// Route to check if server is running
app.get('/', (req, res) => res.send({ status: 'Started' }));

// Route to register a new user
app.post('/register', async (req, res) => {
  const { name, email, mobile, password, courseTitle } = req.body;
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ status: 'error', data: 'User already exists' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      mobile,
      password: encryptedPassword,
      courseTitle // Optional: Associate user with a course title
    });

    res.send({ status: 'ok', data: 'User Created' });
  } catch (error) {
    res.send({ status: 'error', data: error.message });
  }
});

// Route to fetch user data
app.get('/get-data', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password from response
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ status: 'error', data: 'Internal Server Error' });
  }
});

// Route to login a user and receive a token
app.post('/login-user', async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return res.send({ status: 'error', data: 'User Doesn\'t Exist' });
    }

    if (await bcrypt.compare(password, oldUser.password)) {
      const token = jwt.sign(
        { id: oldUser._id, email: oldUser.email, role: oldUser.role },
        JWT_SECRET
      );

      return res.send({ status: 'ok', data: token });
    } else {
      return res.send({ status: 'error', data: 'Invalid Password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', data: 'Internal Server Error' });
  }
});

// API to add a new course
app.post('/courses', async (req, res) => {
  const { name, category, logo } = req.body;

  try {
    const course = new Course({ name, category, logo });
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send({ status: 'error', message: 'Failed to add course', error: error.message });
  }
});

// API to get all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Failed to fetch courses', error: error.message });
  }
});

// API to add a new video with course title
app.post('/videos', async (req, res) => {
  const { title, description, url, courseTitle } = req.body;

  try {
    const course = await Course.findOne({ name: courseTitle });
    if (!course) {
      return res.status(404).send({ status: 'error', message: 'Course not found' });
    }

    const video = new Video({ title, description, url, courseTitle });
    await video.save();
    res.status(201).send(video);
  } catch (error) {
    res.status(400).send({ status: 'error', message: 'Failed to add video', error: error.message });
  }
});

// API to get all videos for a specific course title
app.get('/courses/:courseTitle/videos', async (req, res) => {
  const { courseTitle } = req.params;

  try {
    const videos = await Video.find({ courseTitle });
    if (videos.length === 0) {
      return res.status(404).send({ status: 'error', message: 'No videos found for this course' });
    }
    res.status(200).send(videos);
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Failed to fetch videos', error: error.message });
  }
});

// API to fetch user details by email
app.get('/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }, '-password'); // Exclude password from response

    if (!user) {
      return res.status(404).send({ status: 'error', message: 'User not found' });
    }

    res.status(200).send(user); // Send the user details as the response
  } catch (error) {
    res.status(500).send({ status: 'error', data: 'Internal Server Error' });
  }
});

// Route to fetch the user's profile
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, '-password'); // Fetch user by ID and exclude password
    if (!user) return res.sendStatus(404); // Not found
    res.json(user); // Send user data
  } catch (error) {
    res.status(500).send({ status: 'error', data: 'Internal Server Error' });
  }
});

// Route to fetch users by course title
app.get('/users/course/:courseTitle', async (req, res) => {
  const { courseTitle } = req.params; // Get the course title from the URL

  try {
    const users = await User.find({ courseTitle }, '-password'); // Fetch users linked to the specific course title, excluding passwords

    if (users.length === 0) {
      return res.status(404).send({ status: 'error', message: 'No users found for this course' });
    }

    res.send(users);
  } catch (error) {
    res.status(500).send({ status: 'error', data: 'Internal Server Error' });
  }
});

// API to delete a user by name
app.delete('/delete-data/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const deletedUser = await User.findOneAndDelete({ name }); // Delete user by name from MongoDB
    
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});
app.put('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id; // Assuming you have user ID from the token
  const { name, email, mobile, courseTitle } = req.body;

  try {
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { name, email, mobile, courseTitle },
          { new: true, runValidators: true } // to return the updated user and validate
      );
      res.json(updatedUser);
  } catch (error) {
      res.status(400).send('Error updating user data: ' + error.message);
  }
});

// Start the server
app.listen(8002, () => console.log('Server started on port 8002'));
