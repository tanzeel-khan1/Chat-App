// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import cookies from "js-cookie";
// import axios from "axios";

// const GetAllUsers = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [loading, setLoading] = useState([]);
//   useEffect(() => {
//     const getUsers = async () => {
//       setLoading(true);
//       try {
//         const token = cookies.get("jwt");
//         const response = await axios.get("http://localhost:5002/api/all", {
//           Credentials: " include",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAllUsers(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error in GetAllUser" + error);
//       }
//     };
//     getUsers();
//   }, []);

//   return [allUsers, loading];
// };

// export default GetAllUsers;
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import axios from "axios";

const GetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = cookies.get("jwt");

        const response = await axios.get(
          "/api/all",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllUsers(response.data);
      } catch (error) {
        console.log("Error in GetAllUsers:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
};

export default GetAllUsers;
