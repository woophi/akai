import UserList from 'server/models/users';
import { Logger } from 'server/logger';

export const fetchUserData = async (userId: string) => {
  try {
    const user = await UserList.findById(userId).select('name lastName roles email').lean();

    return {
      ...user,
    };
  } catch (error) {
    Logger.error(error);
    return {};
  }
};
