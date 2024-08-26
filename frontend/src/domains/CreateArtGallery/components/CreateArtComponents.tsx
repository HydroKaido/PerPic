import useCreateGallery from "../hooks/useCreateGallery";
import Spinner from "../../../components/Spinner";
import { useDropzone } from "react-dropzone";

const CreateArtComponents = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    dateTime,
    setDatetime,
    image,
    setImage,
    loading,
    handleSaveDiary,
  } = useCreateGallery();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: { "image/*": [] } });
  return (
    <>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <form onSubmit={handleSaveDiary}>
              <div className="flex justify-between mx-10">
                <h2>Create Pin</h2>
                <button
                  type="submit"
                  className={
                    !image
                      ? "bg-blue-500 opacity-70 px-8 py-2 rounded-full text-white "
                      : `bg-blue-500 px-8 py-2 rounded-full text-white hover:bg-blue-700`
                  }
                  disabled={!image}
                >
                  Submit
                </button>
              </div>
              <div className="mt-10">
                <div className="grid md:grid-cols-2 md:space-x-10 mx-10">
                  <div>
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      className=" flex justify-center items-center border-2 px-4 h-full rounded border-dashed bg-gray-100 "
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <>
                          {isDragAccept && (
                            <div className="flex justify-center items-center">
                              <p className="text-white/40">
                                This file is Accepted
                              </p>
                            </div>
                          )}
                          {isDragReject && (
                            <div className="flex justify-center items-center">
                              <p className="text-white">This is not an Image</p>
                            </div>
                          )}
                          {!isDragActive && (
                            <div className="flex flex-col justify-center items-center my-20 mx-10">
                              <p className="text-gray-500 text-center mb-4">
                                Choose a file or drag and drop it here
                              </p>
                              <p className="text-gray-500 text-center">
                                We recommend using high quality .jpg files less
                                than 20MB
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="uploaded image"
                          className="h-56 w-auto"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className={!image ? "text-gray-300" : "text-gray-700"}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border rounded h-10 mb-4"
                      required
                      disabled={!image}
                    />
                    <label
                      className={!image ? "text-gray-300" : "text-gray-700"}
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border rounded mb-4 resize-none"
                      required
                      disabled={!image}
                    />
                    <label
                      className={!image ? "text-gray-300" : "text-gray-700"}
                    >
                      Link
                    </label>
                    <input
                      type="text"
                      name="dateTime"
                      value={dateTime}
                      onChange={(e) => setDatetime(e.target.value)}
                      className="border rounded h-10 mb-4"
                      required
                      disabled={!image}
                    />
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default CreateArtComponents;
