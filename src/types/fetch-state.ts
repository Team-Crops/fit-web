export interface FetchState<T = never> {
  data: T | null | undefined;
  error: Error | null;
  isLoading: boolean;
}
