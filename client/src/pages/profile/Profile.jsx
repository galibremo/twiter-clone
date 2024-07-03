import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaArrowLeft, FaLink } from "react-icons/fa";
import { IoCalendarOutline, IoLogoChrome } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
import { updateUserImage } from "../../redux/actions/userAction";

export default function Profile() {
  const [coverImg, setCoverImg] = useState();
  const [profileImg, setProfileImg] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);
  const [getPosts, setGetPosts] = useState([]);
  const dispatch = useDispatch();
  const createdAt = moment(currentUser?.createdAt);
  const month = createdAt?.format("MMMM");
  const year = createdAt?.format("YYYY");

  useEffect(() => {
    const fetchPossts = async () => {
      try {
        const { data } = await axios.get(
          `/api/post/user/${currentUser?.username}`
        );
        if (data.success === true) {
          setGetPosts(data.posts);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.message);
      }
    };
    fetchPossts();
  }, [currentUser._id]);

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const updateImage = async () => {
    try {
      dispatch(updateUserImage(profileImg, coverImg, currentUser._id));
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <div className="flex flex-col border-r border-gray-700 min-h-screen w-full lg:w-[750px]">
      <div className="flex w-full p-5 items-center gap-8">
        <div>
          <Link to="/">
            <FaArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div>
          <p>{currentUser.fullName}</p>
          <span>{getPosts.length} posts</span>
        </div>
      </div>
      <div className="relative group/cover">
        <img
          src={coverImg || currentUser?.coverImg || "/cover.png"}
          className="h-52 w-full object-cover"
          alt="cover image"
        />
        {currentUser && (
          <div
            className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
            onClick={() => coverImgRef.current.click()}
          >
            <MdEdit className="w-5 h-5 text-white" />
          </div>
        )}
        <input
          type="file"
          hidden
          accept="image/*"
          ref={coverImgRef}
          onChange={(e) => handleImgChange(e, "coverImg")}
        />
        <input
          type="file"
          hidden
          accept="image/*"
          ref={profileImgRef}
          onChange={(e) => handleImgChange(e, "profileImg")}
        />
        <div className="absolute -bottom-16 left-4">
          <div className="group/avatar">
            <img
              className="w-32 h-32 rounded-full"
              src={
                profileImg ||
                currentUser?.profileImg ||
                "/avatar-placeholder.png"
              }
            />
            <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
              {currentUser && (
                <MdEdit
                  className="w-4 h-4 text-white"
                  onClick={() => profileImgRef.current.click()}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end px-4 mt-5 gap-2">
        {(coverImg || profileImg) && (
          <button
            className="bg-primary rounded-full text-white px-3 py-2 ml-2"
            onClick={updateImage}
          >
            Update
          </button>
        )}
        <button className="px-3 py-2 border rounded-full">Edit Profile</button>
      </div>
      <div className="flex flex-col gap-4 mt-5 px-5">
        <div className="flex flex-col">
          <span className="font-bold text-lg">{currentUser?.fullName}</span>
          <span className="text-sm text-slate-500">
            @{currentUser?.username}
          </span>
          <span className="text-sm">
            {currentUser?.bio ||
              `Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Beatae qui non, sapiente`}
          </span>
        </div>

        <div className="flex gap-2 flex-col">
          <div className="flex gap-1 items-center">
            <FaLink className="w-3 h-3 text-slate-500" />
            <span>
              {currentUser?.link ||
                `http://localhost:5173/profile/${currentUser.username}`}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <IoCalendarOutline className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-500">
              joined {month} {year}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <span className="font-bold text-xs">
              {currentUser?.following.length}
            </span>
            <span className="text-slate-500 text-xs">Following</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="font-bold text-xs">
              {currentUser?.followers.length}
            </span>
            <span className="text-slate-500 text-xs">Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
