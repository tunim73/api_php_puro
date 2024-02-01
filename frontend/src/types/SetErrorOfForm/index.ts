export type SetErrorOfForm = (
  name: string,
  error: {
    type: string;
    message: string;
  }
) => void;
