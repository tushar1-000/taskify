import { toast } from "react-toastify";
function Profile({ name = "tushar", email = "tushar@gmail.com" }) {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300">
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
          <div className="text-center">
            {/* User Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
                {name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* User Name */}
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>

            {/* User Email */}
            <p className="text-gray-500">{email}</p>

            {/* Action Button */}
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                onClick={() => toast.info("Comming soon...")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
