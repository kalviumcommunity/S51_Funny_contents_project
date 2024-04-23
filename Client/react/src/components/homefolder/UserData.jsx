import React, { useEffect, useState } from 'react';
import './userdata.css'
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import { CgProfile } from "react-icons/cg";


const UserData = () => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/GET");
        // Initialize liked status for each content item
        const userData = response.data.map(item => ({
          ...item,
          liked: false
        }));
        setUser(userData);
        console.log("Fetched data:", userData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("User state:", user);

  const handleUserClick = (userData) => {
    setSelectedUser(prevUser => prevUser === userData ? null : userData);
  };

  const handleLikeClick = (contentItem) => {
    setUser(prevUser => prevUser.map(item =>
      item === contentItem ? { ...item, liked: !item.liked } : item
    ));
  };


  return (
    <div className="user_container">
      <h1>Memes of the day</h1>
      {user.map((data, ind) => (
        <div key={ind} className="userandcontent">
          <div className="user" onClick={() => handleUserClick(data)}>
            <CgProfile className='profile_img'/> 
            <h3> | {data.Name} |</h3>
          </div>

          {selectedUser && selectedUser === data && (
            <div className="popup">
              <p>Age: {data.Age}</p>
              <p>Country: {data.Country}</p>
            </div>
          )}

          <div className="image_container">
            <h3>
              <img className="image" src={data.Content} alt="Users content" />
            </h3>
          </div>

          <div className="like_button" onClick={() => handleLikeClick(data)}>
            <i className={`fa${data.liked ? "s" : "r"} fa-heart`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserData;
