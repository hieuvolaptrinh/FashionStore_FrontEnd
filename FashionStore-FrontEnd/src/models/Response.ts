interface RestResponse<T> {
  status: number;
  error: string | null;
  message: string;
  data: T;
}
export default RestResponse;
