import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

const Search = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  // marginLeft: "50%",
  // marginTop: 10,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  elevation: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const Searchbar = ({ placeholder, handleChange }) => {
  const handleInputChange = (event) => {
    const query = event.target.value;
    handleChange(query);
  };

  return (
    <Search>
      <SearchIcon />
      <StyledInputBase
        placeholder={placeholder || "Search…"}
        inputProps={{ "aria-label": "Search" }}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default Searchbar;

// import React from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import { styled, alpha } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
// import Paper from "@mui/material/Paper";

// const Searchbar = ({ placeholder, handleChange, handleKeyPress }) => {
//   const Search = styled(Paper)(({ theme }) => ({
//     display: "flex",
//     justifyContent: 'center',
//     alignItems: "center",
//     width: "30%",
//     marginLeft:'60%',
//     marginTop:10,
//     padding: theme.spacing(1),
//     borderRadius: theme.shape.borderRadius,
//     elevation: 0

//   }));

//   const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     marginLeft: theme.spacing(1),
//     flex: 1,
//   }));

//   return (
//     <Search>
//       <SearchIcon />
//       <StyledInputBase
//         placeholder={placeholder || "Search…"}
//         inputProps={{ "aria-label": "Search" }}
//         onKeyPress={handleKeyPress}
//         onChange={handleChange}
//       />
//     </Search>
//   );
// };

// export default Searchbar;
