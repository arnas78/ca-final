const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT;

//

const {
  User,
  UserAdditional,
  Event,
  Post,
  Lecture,
  Meal,
  Order,
  Refer,
  Vacation,
} = require("./models");

//

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => console.log("Server running on port:" + PORT));
  })
  .catch((e) => console.log(e));

// -- GET /api/users/:id         |   User information (retrieving user information and his movies and orders)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: "Unable to retrieve users",
    });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const doesUserExist = await User.findOne({ _id: userId });
    res.json(doesUserExist);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/users/extra/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const doesUserExtraExist = await UserAdditional.findOne({
      user_id: userId,
    });
    res.json(doesUserExtraExist);
  } catch (error) {
    console.log(error);
  }
});

// -- POST /api/users/signup    |   User signup (creates new user)
app.post("/api/users/signup", async (req, res) => {
  const newUserData = req.body;
  try {
    const newUser = new User(newUserData);
    const createdUser = await newUser.save();

    res.json({
      message: "User created",
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
  }
});

// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/user/extra", async (req, res) => {
  const {
    user_id,
    vacation_days,
    shirt_size,
    bio,
    personal_email,
    address,
    car,
    github,
    linkedin,
    bank_name,
    bank_number,
  } = req.body;

  const newPost = {
    user_id,
    vacation_days,
    shirt_size,
    bio,
    personal_email,
    address,
    car,
    github,
    linkedin,
    bank_name,
    bank_number,
  };

  try {
    const userextra = new UserAdditional(newPost);
    await userextra.save();

    res.json({ message: "Additional info added" });
  } catch (error) {
    console.log(error);
  }
});

// -- PUT /api/movies/:id       |   Movie update and order creation
app.put("/api/user/extra/:id", async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    const user = await UserAdditional.find({
      user_id: userId,
    });

    console.log(user[0]._id);

    const a = await UserAdditional.findByIdAndUpdate(user[0]._id, newData);

    console.log(a);

    res.json({ message: "User updated" });
  } catch (error) {
    console.log(error);
  }
});

// EVENTS

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ events });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: "Unable to retrieve events",
    });
  }
});
// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/events", async (req, res) => {
  const { title, date, place, description, tags, image } = req.body;

  const newEvent = {
    title,
    date,
    place,
    description,
    tags,
    image,
  };

  try {
    const event = new Event(newEvent);
    await event.save();

    res.json({ message: "New event added" });
  } catch (error) {
    console.log(error);
  }
});

// POSTS

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: "Unable to retrieve posts",
    });
  }
});
// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/posts", async (req, res) => {
  const {
    title,
    level,
    location,
    tags,
    requirements,
    description,
    posted,
    payrange,
  } = req.body;

  const newPost = {
    title,
    level,
    location,
    tags,
    requirements,
    description,
    posted,
    payrange,
  };

  try {
    const post = new Post(newPost);
    await post.save();

    res.json({ message: "New post added" });
  } catch (error) {
    console.log(error);
  }
});

// LECTURES

app.get("/api/lectures", async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json({ lectures });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: "Unable to retrieve lectures",
    });
  }
});
// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/lectures", async (req, res) => {
  const { title, place, start, end, desc } = req.body;

  const newLecture = {
    title,
    place,
    start,
    end,
    desc,
  };

  try {
    const lecture = new Lecture(newLecture);
    await lecture.save();

    res.status(200).send({
      message: "Sėkmingai sukurti mokymai:",
      lecture,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/lectures/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const lecture = await Lecture.findByIdAndDelete(id);

    res.status(200).send({
      message: "Sėkmingai ištrinti mokymai:",
      lecture,
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/lectures/:id", async (req, res) => {
  const lectureId = req.params.id;
  const newData = req.body;
  try {
    const lecture = await Lecture.findByIdAndUpdate(lectureId, newData);

    res.status(200).send({
      message: "Sėkmingai atnaujinti mokymai:",
      lecture,
    });
  } catch (error) {
    console.log(error);
  }
});

// MEALS

app.get("/api/meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json({ meals });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: "Unable to retrieve meals",
    });
  }
});
// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/meals", async (req, res) => {
  const { type, title, desc, price, count, isVegan, isPopular, image, id } =
    req.body;

  const newMeal = {
    type,
    title,
    desc,
    price,
    count,
    isVegan,
    isPopular,
    image,
    id,
  };

  try {
    const meal = new Meal(newMeal);
    await meal.save();

    res.json({ message: "New meal added" });
  } catch (error) {
    console.log(error);
  }
});

// ORDERS

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: "Unable to retrieve orders",
    });
  }
});
// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/orders", async (req, res) => {
  const { user_id, type, obj_id } = req.body;

  const newOrder = {
    user_id,
    type,
    obj_id,
  };

  try {
    const order = new Order(newOrder);
    await order.save();

    res.json({ message: "New order added" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Order.findByIdAndDelete(id);

    res.json({ message: "Order deleted" });
  } catch (error) {
    console.log(error);
  }
});

// REFERS

app.get("/api/refers", async (req, res) => {
  try {
    const refers = await Refer.find();
    res.json({ refers });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: "Unable to retrieve refers",
    });
  }
});
// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/refers", async (req, res) => {
  const { user_id, title, name, surname, email, phone } = req.body;

  const newRefer = {
    user_id,
    title,
    name,
    surname,
    email,
    phone,
  };

  try {
    const refer = new Refer(newRefer);
    await refer.save();

    res.json({ message: "New refer added" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/refers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Refer.findByIdAndDelete(id);

    res.json({ message: "Refer deleted" });
  } catch (error) {
    console.log(error);
  }
});

// VACATIONS

app.get("/api/vacations", async (req, res) => {
  try {
    const vacations = await Vacation.find();
    res.json({ vacations });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: "Unable to retrieve vacations",
    });
  }
});
// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/vacations", async (req, res) => {
  const { user_id, start_date, end_date, status } = req.body;

  const newVacation = {
    user_id,
    start_date,
    end_date,
    status,
  };

  try {
    const vacation = new Vacation(newVacation);
    await vacation.save();

    res.json({ message: "New vacation added" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/vacations/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Vacation.findByIdAndDelete(id);

    res.json({ message: "Vacation deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/vacations/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const doesVacationExist = await Vacation.findOne({ _id: id });
    res.json(doesVacationExist);
  } catch (error) {
    console.log(error);
  }
});