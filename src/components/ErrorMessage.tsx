interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) {
    return null;
  }
  return (
    <div className='text-red-500 bg-red-50 rounded-md text-center p-2 mb-4'>
      {error}
    </div>
  );
};

export default ErrorMessage;
