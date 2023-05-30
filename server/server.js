const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const bodyParser = require("body-parser");
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
  Image,
} = require("./models");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

//

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => console.log("Server running on port:" + PORT));
  })
  .catch((e) => console.log(e));

app.post("/api/images", upload, async (req, res, next) => {
  const data = {
    image: req.file.path,
  };
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      const image = new Image({
        user_id: req.body.user_id,
        img: result.url,
      });
      const response = image.save();
      res.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failure",
        error,
      });
    });
});

// -- POST /api/movies          |   Movie creation (creates new movie)
app.post("/api/meals", upload, async (req, res, next) => {
  const data = {
    image: req.file.path,
  };
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      const {
        type,
        title,
        restaurant,
        desc,
        price,
        count,
        isVegan,
        isPopular,
      } = req.body;

      const image = result.url;

      const newMeal = {
        type,
        title,
        restaurant,
        desc,
        price,
        count,
        isVegan,
        isPopular,
        image,
      };
      // const image = new Image({
      //   user_id: req.body.user_id,
      //   img: result.url,
      // });

      const meal = new Meal(newMeal);
      meal.save();
      res.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failure",
        error,
      });
    });
});

app.get("/api/users/extra", async (req, res) => {
  try {
    const extra = await UserAdditional.find();
    res.json({ extra });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: "Unable to retrieve users",
    });
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

// -- POST /api/users/signup    |   User signup (creates new user)
// app.post("/api/users/signup", async (req, res) => {
//   const newUserData = req.body;
//   try {
//     const isUserExist = await User.findOne({
//       work_email: newUserData.work_email,
//     });

//     if (!isUserExist) {
//       const newUser = new User(newUserData);

//       const createdUser = await newUser.save();

//       res.json({
//         message: "User created",
//         user: createdUser,
//       });
//     } else {
//       res.json({ message: "User with given email already exists" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post("/api/users", upload, async (req, res, next) => {
  const data = {
    image: req.file.path,
  };
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      const {
        nane,
        surname,
        work_email,
        position,
        location,
        password,
        phone,
        birthdate,
        sex,
        personal_number,
        level,
      } = req.body;

      const image = result.url;

      const newUser = {
        nane,
        surname,
        work_email,
        position,
        location,
        password,
        phone,
        birthdate,
        sex,
        personal_number,
        level,
      };

      const event = new User(newUser);
      event.save();
      res.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failure",
        error,
      });
    });
});

// -- POST /api/users/login     |   User login (connects existing user)
app.post("/api/users/login", async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.findOne(userData);

    if (user) {
      res.json({ message: "Vartotojas rastas", user });
    } else {
      res.json({
        message: "Vartotojo el. paštas arba slaptažodis neteisingi!",
      });
    }
  } catch (error) {
    console.log(error);
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
    image,
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
    image,
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
// app.post("/api/events", async (req, res) => {
//   const { title, date, place, description, tags, image } = req.body;

//   const newEvent = {
//     title,
//     date,
//     place,
//     description,
//     tags,
//     image,
//   };

//   try {
//     const event = new Event(newEvent);
//     await event.save();

//     res.json({ message: "New event added" });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post("/api/events", upload, async (req, res, next) => {
  const data = {
    image: req.file.path,
  };
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      const { title, date, place, description, tags } = req.body;

      const image = result.url;

      const newEvent = {
        title,
        date,
        place,
        description,
        tags,
        image,
      };
      // const image = new Image({
      //   user_id: req.body.user_id,
      //   img: result.url,
      // });

      const event = new Event(newEvent);
      event.save();
      res.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failure",
        error,
      });
    });
});

app.put("/api/events/:id", async (req, res) => {
  const eventId = req.params.id;
  const newData = req.body;
  try {
    const event = await Event.findByIdAndUpdate(eventId, newData);

    res.status(200).send({
      message: "Sėkmingai atnaujinti mokymai:",
      event,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/events/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findByIdAndDelete(id);

    res.status(200).send({
      message: "Sėkmingai ištrinti mokymai:",
      event,
    });
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

app.put("/api/posts/:id", async (req, res) => {
  const postId = req.params.id;
  const newData = req.body;
  try {
    const post = await Post.findByIdAndUpdate(postId, newData);

    res.status(200).send({
      message: "Sėkmingai atnaujintas skelbimas:",
      post,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(id);

    res.status(200).send({
      message: "Sėkmingai ištrintas skelbimas:",
      post,
    });
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
  const { title, place, start, end, desc, id } = req.body;

  const newLecture = {
    title,
    place,
    start,
    end,
    desc,
    id,
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

app.delete("/api/meals/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const meal = await Meal.findByIdAndDelete(id);

    res.status(200).send({
      message: "Sėkmingai ištrinti mokymai:",
      meal,
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/meals/:id", async (req, res) => {
  const mealId = req.params.id;
  const newData = req.body;
  try {
    const meal = await Meal.findByIdAndUpdate(mealId, newData);

    res.status(200).send({
      message: "Sėkmingai atnaujintas patiekalas",
      meal,
    });
  } catch (error) {
    console.log(error);
  }
});

// -- POST /api/movies          |   Movie creation (creates new movie)
// app.post("/api/meals", async (req, res) => {
//   const {
//     type,
//     title,
//     restaurant,
//     desc,
//     price,
//     count,
//     isVegan,
//     isPopular,
//     image,
//   } = req.body;

//   const newMeal = {
//     type,
//     title,
//     restaurant,
//     desc,
//     price,
//     count,
//     isVegan,
//     isPopular,
//     image,
//   };

//   try {
//     const meal = new Meal(newMeal);
//     await meal.save();

//     res.json({ message: "New meal added" });
//   } catch (error) {
//     console.log(error);
//   }
// });

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
  const { user_id, type, obj_id, weekday } = req.body;

  const newOrder = {
    user_id,
    type,
    obj_id,
    weekday,
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
app.post("/api/refers", upload, async (req, res, next) => {
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
