import { useEffect, useState } from "react";
import "./Content.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import { CgProfile } from "react-icons/cg";
import { SlArrowUp } from "react-icons/sl";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const UserData = () => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/GET");
      const userData = response.data.map((item) => ({
        ...item,
        liked: false,
      }));
      userData.reverse();
      setUser(userData);
      console.log("Fetched data:", userData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("User state:", user);

  const handleUserClick = (userData) => {
    setSelectedUser((prevUser) => (prevUser === userData ? null : userData));
  };

  // const handleLikeClick = (contentItem) => {
  //   setUser((prevUser) =>
  //     prevUser.map((item) =>
  //       item === contentItem ? { ...item, liked: !item.liked } : item
  //     )
  //   );
  // };

  // const handleDelete = async(id)=>{
  //   try{
  //     await axios.delete(`http://localhost:3000/DELETE/${id}`);
  //     toast.success("Meme deleted")
  //     fetchData()
  //   }catch(error){
  //     console.log(error.message)
  //   }
  // }


  // const handleUpdate = () => {
  //   navigate("/update")
  //  };

  return (
    <div className="user_container">
      <h1>Memes of the day</h1>
      <button className="arrow_up" onClick={scrollUp}>
        <SlArrowUp />
      </button>

      {user.map((data, ind) => (
        <div key={ind} className="userandcontent">
          <div className="user" onClick={() => handleUserClick(data)}>
            <CgProfile className="profile_img" />
            <h3> | {data.name} |</h3>
          </div>

          {selectedUser && selectedUser === data && (
            <div className="popup">
              <p>Age: {data.age}</p>
              <p>Country: {data.country}</p>
              <p>Link:{data.content}</p>
            </div>
          )}

          <div className="image_container">
              <img className="image" src={data.content} alt="Users content" />
          </div>

          {/* <div className="like_button_delete_update " >
            <div onClick={() => handleLikeClick(data)}>
            <i className={`fa${data.liked ? "s" : "r"} fa-heart`} />
            </div>

            <div>
              <button className="delete" onClick={() => handleDelete(data._id)}>Delete</button>
              <NavLink to={`/update/${data._id}`}>
                <button className="update" onClick={() => {handleUpdate(data._id);}}>Update</button>
              </NavLink>
            </div>

          </div> */}

        </div>
      ))}
    </div>
  );
};

export default UserData;
