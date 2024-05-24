export interface ApiError extends Error {
  code: string;
  message: string;
}
