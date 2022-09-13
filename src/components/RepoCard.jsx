import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import axios from "../axios";
import moment from "moment"
const RepoCard = ({
  repName,
  language,
  id,
  desc,
  created,
  lastUpdate,
  fetchInfo,
  username
}) => {
  const [open, setOpen] = useState(false);
  const [repInfo, setRepInfo] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


    const fetchRepoinfo = async (id) => {
      try {
        const res = await axios.get(`repos/${username}/${id}`);

        console.log(res);
        setRepInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
        fetchRepoinfo()
    }, [])

  return (
    <Box
      onClick={handleOpen}
      sx={{
        my: "10px",
        backgroundColor: "white",
        width: "100%",
        borderRadius: "16px",
        padding: "20px",
        transition: "200ms",
        color: "black",
        boxShadow: "0px 8px 20px -19px black",
        ":hover": {
          transform: "translateY(-2px)",
          boxShadow: "0px 12px 20px -12px black",
          cursor: "pointer",
        },
      }}
    >
      <Typography sx={{ fontWeight: "700", textDecoration: "underline" }}>
        {repName}
      </Typography>
      <Typography>{language || "cannot recognize language"}</Typography>
      <Modal onClose={handleClose} open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>
          <Stack spacing={3}>
            <Typography
              sx={{
                fontSize: 21,
                fontWeight: "700",
                textDecoration: "underline",
              }}
            >
              nama Repo
            </Typography>
            <Typography>RepID : {id}</Typography>
            <Typography>Language : {language}</Typography>
            <Typography>Description : {desc || "-"}</Typography>
            <Typography>Created Date : {(created)}</Typography>
            <Typography>last update : {moment(lastUpdate, "MM-DD-YYYY")}</Typography>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default RepoCard;
