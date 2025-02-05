import User from "../models/user";

const onboardUser = (name: string) => {
  return User.query().insertAndFetch({
    name,
  });
};

const fetchUser = (id: string) => {
  return User.query().findById(id);
};

export {
  onboardUser,
  fetchUser,
};
