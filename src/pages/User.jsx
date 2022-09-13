import {
  Typography,
  Box,
  Container,
  Avatar,
  Select,
  MenuItem,
  Divider,
  Pagination,
  PaginationItem,
  IconButton,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axios";
import RepoCard from "../components/RepoCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";

const UserPage = () => {
  const [dataPerPage, setDataPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState({});
  const [usersRep, setUsersRep] = useState([]);
  const [repInfo, setRepInfo] = useState({});
  const { username } = useParams();

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`users/${username}`);

      console.log(res);
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsersRepo = async () => {
    try {
      const res = await axios.get(
        `users/${username}/repos?page=${page}&per_page=${dataPerPage}`
      );

      console.log(res);
      setUsersRep(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePage = (dir) => {
    if (dir == "prev") {
      if (page === 1) return page;
      else return setPage((page) => page - 1);
    } else if (dir == "next") {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUsersRepo();
  }, [page, dataPerPage]);

  return (
    <Container maxWidth="sm" sx={{ color: "white", my: "100px" }}>
      <Link to="/">
        <Button variant="contained" sx={{ my: "10px" }}>
          <ArrowBackIcon />
        </Button>
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          minHeight: "1000px",
          background: "linear-gradient(#285071, #0D1B26)",
          borderRadius: "16px 16px 16px 16px",
          padding: "30px",
          boxShadow: "1px 12px 26px -14px rgba(0,0,0,0.75)",
        }}
      >
        <Box sx={{ mt: "30px" }}>
          <Avatar
            src={userData.avatar_url}
            sx={{
              height: "250px",
              width: "250px",
              boxShadow: "1px 12px 26px -10px rgba(0,0,0,0.75)",
            }}
            variant="rounded"
          />
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "700",
              my: "20px",
            }}
          >
            {userData.login}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                Followers
              </Typography>
              <Typography>{userData.followers}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                Following
              </Typography>
              <Typography>{userData.following}</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            my: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "21px", fontWeight: "600", mr: "10px" }}>
            Repositories
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mr: "5px", fontSize: "14px" }}>
              Data per Page
            </Typography>
            <Select
              onChange={(e) => setDataPerPage(e.target.value)}
              size="small"
              sx={{
                width: "80px",
                "& .MuiInputBase-input": {
                  border: "1px solid #ced4da",
                  color: "#ced4da",
                  ":&hover": {
                    border: "1px solid white",
                  },
                },
              }}
              value={dataPerPage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            minHeight: "500px",
            background: "linear-gradient(#285071, #0D1B26)",
            filter: "blur(50%)",
            borderRadius: "16px 16px 16px 16px",
            padding: "30px",
            boxShadow: "1px 12px 26px -14px rgba(0,0,0,0.75)",
            color: "white",
          }}
        >
          {usersRep.length ? (
            usersRep.map((val) => {
              return (
                <RepoCard
                  language={val.language}
                  repName={val.name}
                  id={val.id}
                  username={userData.login}
                  created={val.created_at}
                  lastUpdate={val.updated_at}
                />
              );
            })
          ) : (
            <Typography
              color="white"
              textAlign="center"
              variant="h5"
            >
              user doesn't have any repository
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "60%",
            justifyContent: "space-between",
            mt: "20px",
          }}
        >
          <IconButton onClick={() => handlePage("prev")} disabled={page === 1}>
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography>{page}</Typography>
          <IconButton
            onClick={() => handlePage("next")}
            disabled={usersRep.length !== dataPerPage}
          >
            <ArrowForwardIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default UserPage;
