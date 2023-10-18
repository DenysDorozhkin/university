export type ErrorWithMessage = {
  message: string;
  response: {
    data: {
      error: string;
      message: string[];
      statusCode: number;
    };
  };
};
