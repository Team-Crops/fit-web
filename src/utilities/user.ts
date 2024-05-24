import {
  UserBackgroundStatus,
  UserBackgroundStatusStudent,
  UserBackgroundStatusWorker,
} from '#/types';

export function isUserStudent(status: UserBackgroundStatus): status is UserBackgroundStatusStudent {
  return Object.values(UserBackgroundStatusStudent).includes(status as UserBackgroundStatusStudent);
}

export function isUserWorker(status: UserBackgroundStatus): status is UserBackgroundStatusWorker {
  return Object.values(UserBackgroundStatusWorker).includes(status as UserBackgroundStatusWorker);
}
