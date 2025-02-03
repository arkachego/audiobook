import User from "../models/user";

const onboardUser = (name: string) => {
  return User.query().insertAndFetch({
    name,
  });
};

export {
  onboardUser,
};
