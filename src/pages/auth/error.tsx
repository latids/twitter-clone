import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen">
      <p className="text-lg text-gray-400 mb-6">
        An error occurred while processing authorization.
      </p>
      <Link className="text-blue-500 hover:underline text-2xl " href="/">
        Return to main page
      </Link>
    </div>
  );
};

export default ErrorPage;
