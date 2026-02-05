import mongoose from "mongoose";
import userModel from "./user.js";

async function preloadUsers() {
  const count = await userModel.countDocuments();
  if (count === 0) {
    await userModel.insertMany([
      { name: "Mac", job: "Bouncer" },
      { name: "Dee", job: "Actress" },
      { name: "Dennis", job: "Bartender" },
      { name: "Charlie", job: "Janitor" },
      { name: "Frank", job: "Businessman" },
    ]);
    console.log("Starting users added to database");
  }
}

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users")
  .then(async () => {
    console.log("Connected to MongoDB");
    await preloadUsers();
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = userModel.find({ name });
  } else if (job && !name) {
    promise = userModel.find({ job });
  } else {
    promise = userModel.find({ name, job });
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById, 

};