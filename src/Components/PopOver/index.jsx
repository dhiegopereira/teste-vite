/* eslint-disable react/prop-types */

import "./styles.css";
import Popover from "@mui/material/Popover";
import LogoutIcon from "@mui/icons-material/Logout";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Typography, Box } from "@mui/material";

import { useNavigate } from "react-router-dom";

const PopOver = ({ anchorEl, setAnchorEl, setModalEditOpen }) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOpenDialog = (e) => {
    e.preventDefault();

    setModalEditOpen(!false);
    handleClose();
  };

  const handleLogOut = (e) => {
    e.preventDefault;
    localStorage.clear();

    navigate("/");
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          mt: "10px",
          "&::before": {
            backgroundColor: "white",
            content: '""',
            display: "block",
            position: "absolute",
            width: 12,
            height: 12,
            top: -6,
            transform: "rotate(45deg)",
            left: "calc(20% - 6px)",
          },
        }}
      />
      <Typography
        sx={{
          pt: 2,
          pb: 2,
          pl: 2,
          pr: 2,
          width: 130,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 3,
          margin: "0 6px 6px 6px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box className="editIcon">
          <BorderColorIcon
            onClick={(e) => {
              handleOpenDialog(e);
            }}
          />
          Editar
        </Box>

        <Box className="logOutIcon">
          <LogoutIcon
            onClick={(e) => {
              handleLogOut(e);
            }}
          />
          Sair
        </Box>
      </Typography>
    </Popover>
  );
};

export default PopOver;
