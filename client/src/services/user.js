import userStub from '@/stubs/user';

const formatUser = userName => {
  const user = userStub;
  user.name = userName;
  user.id = (Math.random() * 100) | 0;

  return user;
};

export { formatUser };
