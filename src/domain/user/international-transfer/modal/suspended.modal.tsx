import { IoMdCloseCircleOutline } from "react-icons/io";

export const SuspendedModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white max-w-md w-full p-6 rounded-md text-center shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>
        <div className="text-red-500 mb-4 flex justify-center items-center">
          <IoMdCloseCircleOutline size={100}/>
        </div>
        <h2 className="text-2xl font-bold mb-2">Account suspended!</h2>
        <p className="text-gray-600 mb-4">
          Sorry, your online account has been temporarily restricted due to
          change of location and unusual activities
        </p>
        <p className="mb-4">
          Contact support for assistance at{" "}
          <a
            href="mailto:support@wbonline.com"
            className="text-teal-600 underline"
          >
            support@wbonline.com
          </a>
        </p>
        <button
          onClick={onClose}
          className="mt-2 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};
