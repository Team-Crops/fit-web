import _ from 'lodash';

import { Matching } from '#/types';

export function isMatching(object: object | null | undefined): object is Matching {
  return (
    !_.isNil(object) &&
    'id' in object &&
    (typeof object.id === 'number' || object.id === null) &&
    'userId' in object &&
    typeof object.userId === 'number' &&
    'positionId' in object &&
    typeof object.positionId === 'number' &&
    'status' in object &&
    typeof object.status === 'string' &&
    'expiredAt' in object &&
    typeof object.expiredAt === 'string' &&
    'createdAt' in object &&
    typeof object.createdAt === 'string'
  );
}
