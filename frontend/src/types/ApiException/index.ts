export interface ApiException {
    message: string;
    error: boolean;
}


export const isApiException = (obj: any): obj is ApiException =>  {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    'error' in obj
  );
}
