import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { getAllUsersApi } from "../../../apis/Api";
import { Avatar } from "@mui/material";

const UserListing = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsersApi().then((res) => {
      console.log(res.data.users);
      setUsers(res.data.users);
    });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box width="15%"></Box>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        First Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        Last Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        Image
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      {/* Corrected profile image code */}
                      <TableCell>
                        {user.profileImage ? (
                          <Avatar
                            sx={{ width: 80, height: 80, margin: "auto" }}
                            src={user.profileImage} // Display profile image
                          />
                        ) : (
                          <Typography variant="body2">
                            Upload img from profile
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default UserListing;


// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
// import React, { useEffect, useState } from "react";
// import { getAllUsersApi } from "../../../apis/Api";
// import { Avatar } from "@mui/material";

// const UserListing = () => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     getAllUsersApi().then((res) => {
//       console.log(res.data.users);
//       setUsers(res.data.users);
//     });
//   }, []);

//   return (
//     <>
//       <Box sx={{ display: "flex" }}>
//         <Box width="15%"></Box>

//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <div>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>
//                       <Typography variant="p" fontWeight="bold">
//                         First Name
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="p" fontWeight="bold">
//                         Last Name
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="p" fontWeight="bold">
//                         Email
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="p" fontWeight="bold">
//                         Image
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {users.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell>{user.firstName}</TableCell>
//                       <TableCell>{user.lastName}</TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       {!user.profileImage} ? (<TableCell> <Avatar
//                       sx={{ width: 80, height: 80, margin: "auto" }}
//                       src={user.profileImage} // Display profile image
//                     >
//                       {/* <ProfileIcon fontSize="large" /> */}
//                     </Avatar> </TableCell>):(<TableCell>Upload img from profile</TableCell>)
                      
//                       <TableCell>
//                         {/* Add buttons for edit and delete here */}
//                         {/* <ButtonGroup variant="outlined" aria-label="outlined button group">
//                           <Button>Edit</Button>
//                           <Button>Delete</Button>
//                         </ButtonGroup> */}
//                         {/* For simplicity, I'm using regular buttons here */}
//                         <Button
//                           onClick={() => console.log(`Edit user ${user.id}`)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           onClick={() => console.log(`Delete user ${user.id}`)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default UserListing;
