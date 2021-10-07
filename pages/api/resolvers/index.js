import User from "@/models/user";

export const resolvers = {
  Query: {
    // hello: () => "Hello world!",
    users: () => User.find()
  }
};
