import { FaLink } from "react-icons/fa";
import { GoLock } from "react-icons/go";
import { MdOutlinePerson } from "react-icons/md";
import { SlWallet } from "react-icons/sl";

const Profile = () => {
    return (
      <div className="flex flex-col lg:flex-row gap-6 p-3 md:p-6 md:mt-10">
        {/* Left Panel */}
        <div className="relative rounded-md shadow-sm border border-gray-100 p-6 w-full lg:w-1/2 self-start overflow-hidden">
          {/* Gray background with slanted curve */}
          <div
            className="absolute top-0 left-0 right-0 h-40  bg-gray-300"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
            }}
          ></div>

          {/* White background for lower part */}
          <div className="absolute top-40 bottom-0 left-0 right-0 bg-white"></div>

          {/* Content container with relative positioning */}
          <div className="relative z-10 mt-45">
            <div className="flex items-center mb-6 ml-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                className="w-20 h-20 rounded-full border-4 border-white shadow-md"
              />
              <h2 className="ml-4 text-2xl font-semibold text-white drop-shadow-md">
                <span className="text-gray-900 font-bold">Susan Anthony</span>
              </h2>
            </div>

            <div className="flex flex-col gap-3 md:justify-between lg:flex-row mb-4 ml-4">
              <div className="">
                <span className="text-sm text-gray-600 font-medium">
                  STATUS:
                </span>{" "}
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs ml-2">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-gray-600 font-medium">
                  Account no:
                </span>{" "}
                <button className="ml-2 px-3 py-1 text-white bg-blue-900 rounded text-sm font-medium flex items-center gap-2">
                  <FaLink />
                  1588292822
                </button>
              </div>
            </div>

            <div className="mb-3 ml-4">
              <label className="text-sm font-medium text-gray-700">
                Profile Completion +10
              </label>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-blue-900 h-2 rounded w-full"></div>
              </div>
              <p className="text-sm text-right text-blue-700">100/100</p>
            </div>

            <div className="mb-3 ml-4">
              <label className="text-sm font-medium text-gray-700">
                Account Security +5
              </label>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-blue-900 h-2 rounded w-full"></div>
              </div>
              <p className="text-sm text-right text-blue-700">100/100</p>
            </div>

            <div className="mb-6 ml-4">
              <label className="text-sm font-medium text-gray-700">
                Verification
              </label>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-blue-900 h-2 rounded"
                  style={{ width: "90%" }}
                ></div>
              </div>
              <p className="text-sm text-right text-blue-700">90/100</p>
            </div>

            <div className="flex gap-3 flex-wrap ml-4">
              <button className="flex items-center gap-1 px-4 py-1 bg-blue-900 text-white rounded hover:bg-blue-800 text-sm">
                <GoLock size={15} /> Change Password
              </button>
              <button className="flex items-center gap-1 px-4 py-1  bg-blue-900 text-white rounded hover:bg-blue-800 text-sm">
                <GoLock size={15} /> Change Pin
              </button>
              <button className="flex items-center gap-1 px-4 py-1 bg-blue-900 text-white rounded hover:bg-blue-800 text-sm">
                <MdOutlinePerson size={18} /> Update Photo
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 w-full lg:w-2/3">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <SlWallet size={30} />
            Profile Information
          </h2>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value="crystal55560@outlook.com"
              disabled
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded bg-gray-100 outline-none"
            />
          </div>

          <div className="mt-2">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value="Tanisa601"
              disabled
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded bg-gray-100 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value="Susan"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value="Anthony"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded outline-none"
              />
            </div>

            <div className="md:col-span-2 mt-8">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded outline-none"
                rows={2}
                value="3338 Owagner Lane,seattle,WA,98119"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                value="1983-05-11"
                className="w-full mt-1 px-4 py-2 border rounded border-gray-300 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
               Country
              </label>
              <input
                type="text"
               placeholder="Enter your country"
                className="w-full mt-1 px-4 py-2 border rounded border-gray-300 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value="+14155298295"
                className="w-full mt-1 px-4 py-2 border rounded border-gray-300 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <input
                type="text"
                value="Female"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-red-500 text-white px-4 py-2 text-[11px] rounded hover:bg-red-600">
              EDIT PROFILE
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;
  