
import { Link } from "react-router-dom";
import notFound from "../assets/notFound.png";
function NotFoundPage() {
  return (
    <div className=" py-4 container mx-auto px-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl text-center ">
      <h1 className="mb-2 text-4xl">404 Not Found</h1>
      <div>
        <img src={notFound} alt="" className="m-auto" />
      </div>

      <div className="py-4 text-center">
        <h2>We can&apos;t find that page</h2>
        <p className="mb-10"> 
          The link you followed may be broken or the page may have been removed.
        </p>
        <Link to="/">
          <button className="bg-blue-500 text-white font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300">
            Go to homepage
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
