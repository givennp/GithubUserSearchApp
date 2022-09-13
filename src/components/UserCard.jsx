import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserCard = ({ id, username, avatar }) => {
  return (
    <Link to={`user/${username}`}>
      <Box
        sx={{
          my: "10px",
          backgroundColor: "white",
          width: "100%",
          borderRadius: "16px",
          padding: "20px",
          transition: "200ms",
          boxShadow: "0px 8px 20px -19px black",
          ":hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 12px 20px -12px black",
            cursor: "pointer",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item sx={4} md={4}>
            <Avatar
              variant="rounded"
              sx={{ width: "100px", height: "100px" }}
              src={avatar}
            />
          </Grid>
          <Grid item sx={8} md={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "100%"
              }}
            >
              <Typography fontWeight={600}>Username : {username}</Typography>
              <Typography>ID : {id}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
};

export default UserCard;
