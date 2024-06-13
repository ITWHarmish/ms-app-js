import "./Error.scss";

interface IError {
  message: string;
}

const Error = ({ message }: IError) => {
  return (
    <div className="error">
      <small className="error-message">{message}</small>
    </div>
  );
};

export default Error;
