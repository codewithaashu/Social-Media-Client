import React from "react";
const PhotosProfile = ({ photos }) => {
  return (
    <>
      <div className="p-4 border-b-[1px] border-zinc-900 flex flex-col gap-3 bg-zinc-950 rounded-lg shadow-xl">
        {/* Header */}
        <h1 className="text-xl font-semibold">Photos ({photos.length})</h1>
        {/*FriendsContainer  */}
        {photos.length === 0 ? (
          <h1 className="text-2xl font-semibold text-ascent-2 bg-zinc-950 py-16 text-center">
            No Photos
          </h1>
        ) : (
          <>
            <div className="flex gap-4 p-5 flex-wrap">
              {photos.map((photo, index) => {
                return (
                  <div key={index} className="cursor-pointer relative">
                    <img
                      src={photo}
                      alt="Avatar"
                      className=" md:w-52 md:h-52 rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PhotosProfile;
