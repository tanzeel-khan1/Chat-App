import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../jwt/generateToken.js";

// export const signup = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;

//     if (!name || !email || !password || !confirmPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       confirmPassword: hashedPassword, // optional to store
//     });

//     // Save user
//     await newUser.save();

//     // Generate token
//     generateToken(newUser._id, res);

//     // Send response with the newly created user
//     res.status(201).json({
//       message: "User created successfully",
//       user: {
//         _id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // optional to store
    });

    // Save user
    await newUser.save();

    // ❌ Removed generateToken here
    // generateToken(newUser._id, res);

    // ✔ Response only
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✔ Correct model name
//     const user = await User.findOne({ email });

//     // ✔ First check if user exists
//     if (!user) {
//       return res.status(404).json({ message: "Invalid email or password" });
//     }

//     // ✔ Then compare password safely
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(404).json({ message: "Invalid email or password" });
//     }

//     // ✔ Generate token
//     generateToken(user._id, res);

//     // ✔ Response
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // ✔ Token only on login
    generateToken(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// export const getUserProfile = async (req, res) => {
//   try {
//     const loggedInUserId = req.user._id;

//     const FiltredUser = await User.find({
//       _id: { $ne: loggedInUserId },
//     }).select("-password -confirmPassword -__v");

//     res.status(200).json(FiltredUser);
//   } catch (error) {
//     console.log("error getallusers", error);
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };
export const getUserProfile = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    console.log("Logged-in user ID:", loggedInUserId);

    const allUsers = await User.find().select("-password -confirmPassword -__v");
    console.log("All users in DB:", allUsers);

    const filteredUsers = allUsers.filter(user => user._id.toString() !== loggedInUserId.toString());
    console.log("Filtered users (excluding logged-in):", filteredUsers);

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error getallusers", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

