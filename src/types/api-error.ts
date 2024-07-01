export class ApiError {
  static readonly INVALID_ACCESS_TOKEN_CODE = 'auth-4';

  static readonly MATCHING_ALREADY_STARTED_CODE = 'matching-1';
  static readonly MATCHING_NOT_FOUND_CODE = 'matching-2';

  code: string;
  message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  static isApiError(error: object): error is ApiError {
    if (!error) {
      return false;
    }
    return (
      'code' in error &&
      typeof error.code === 'string' &&
      'message' in error &&
      typeof error.message === 'string'
    );
  }
}
