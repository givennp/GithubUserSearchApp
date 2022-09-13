import {
  Box,
  Button,
  Input,
  OutlinedInput,
  Pagination,
  Typography,
  Container,
  Autocomplete,
  TextField,
} from "@mui/material";
import UserCard from "./components/UserCard";
import axios from "./axios";
import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchInput = (e) => {
    const { value } = e.target;

    setSearchInput(value);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("search/users?q=" + searchInput);
      setUsers(data.items);
      console.log(data.items);
    } catch (err) {
      return console.log(err);
    }
  };

  const handleSearch = async (e) => {
     try {
       const { data } = await axios.get("search/users?q=" + e);
       setUsers(data.items);
     } catch (err) {
       console.log(err);
       return null;
     }
  }

  useEffect(() => {
    fetchUsers();
  }, [searchInput]);

  return (
    <Container maxWidth="sm" sx={{ my: "100px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <GitHubIcon sx={{ mb: "20px", fontSize: "80px", color: "white" }} />
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            mb: "20px",
            color: "white",
          }}
        >
          Github User Search
        </Typography>
        <form>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              my: "10px",
              width: "100%",
              "& .MuiInputBase-root": {
                backgroundColor: "white",
              },
            }}
          >
            <Autocomplete
              disablePortal
              size="small"
              sx={{ width: "400px" }}
              renderInput={(params) => (
                <TextField
                  onChange={handleSearchInput}
                  {...params}
                  placeholder="search user"
                />
              )}
              autoHighlight
              getOptionLabel={(option) => option.login}
              filterSelectedOptions
              options={users}
            />
            {/* <OutlinedInput
              size="small"
              fullWidth={true}
              value={searchInput}
              onChange={handleSearchInput}
              placeholder="search user"
            /> */}
            {/* <Button
              type="submit"
              onClick={handleSearch(searchInput)}
              variant="contained"
              sx={{
                ml: "10px",
                backgroundColor: "#285071",
                "&:hover": { backgroundColor: "#0D1B26" },
              }}
            >
              Search
            </Button> */}
          </Box>
        </form>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            minHeight: "500px",
            background: "linear-gradient(#285071, #0D1B26)",
            borderRadius: "16px",
            my: "10px",
            padding: "30px",
            boxShadow: "1px 12px 26px -14px rgba(0,0,0,0.75)",
          }}
        >
          {users.length ? (
            <UserCard
              id={users[0].id}
              username={users[0].login}
              avatar={users[0].avatar_url}
            />
          ) : (
            <Typography color="white" textAlign="center" variant="h4">
              No User Found
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
