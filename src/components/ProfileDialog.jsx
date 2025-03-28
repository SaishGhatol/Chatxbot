import React, { useState, useContext } from "react";
import {
  Popover, List, ListItem, ListItemIcon, ListItemText, Switch, Dialog, DialogTitle, DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  SvgIcon,
  useTheme,
} from "@mui/material";
import { ThemeContext } from "../ThemeContext"; // Ensure ThemeContext is implemented
import { useNavigate } from "react-router-dom";

// Import custom icons from assets folder
import { ReactComponent as SettingsIcon } from "../assets/SettingIcon.svg";
import { ReactComponent as DeleteIcon } from "../assets/DeleteIcon.svg";
import { ReactComponent as LogoutIcon } from "../assets/LogoutIcon.svg";
import { ReactComponent as ContactIcon } from "../assets/ContactIcon.svg";
import { ReactComponent as LinkedInIcon } from "../assets/LinkedInIcon.svg";

const ProfileDialog = ({ open, onClose, anchorEl, onDeleteAllChats }) => {
  const theme = useTheme(); // Get MUI theme
  const { toggleTheme } = useContext(ThemeContext); // Use custom theme toggle function
  const navigate = useNavigate();

  const [contactPopoverAnchorEl, setContactPopoverAnchorEl] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  const contacts = [
    { name: "Saish Ghatol", link: "https://www.linkedin.com/in/saish-ghatol/" },
    { name: "Sujal Attrade", link: "https://www.linkedin.com/in/sujal-attarde/" },
    { name: "Nakul Kushe", link: "https://www.linkedin.com/in/nakul-kushe-61a9512bb/" },
    { name: "Tanay Palkandwar", link: "https://www.linkedin.com/in/janesmith" },
  ];

  // Delete confirmation handlers
  const handleDeleteAllChats = () => setDeleteConfirmationOpen(true);
  const handleDeleteConfirmationClose = () => setDeleteConfirmationOpen(false);
  const handleDeleteConfirmed = () => {
    onDeleteAllChats();
    setDeleteConfirmationOpen(false);
  };

  // Contact Popover handlers
  const handleContactClick = (event) => setContactPopoverAnchorEl(event.currentTarget);
  const handleContactPopoverClose = () => setContactPopoverAnchorEl(null);

  // Logout handlers
  const handleLogoutClick = () => setLogoutConfirmationOpen(true);
  const handleLogoutConfirmed = () => {
    setLogoutConfirmationOpen(false);
    navigate("/login");
  };
  const handleLogoutConfirmationClose = () => setLogoutConfirmationOpen(false);

  return (

    <>
      {/* Profile Dialog (Popover) */}
      <Popover
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableRestoreFocus
        PaperProps={{
          style: {
            borderRadius: "20px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme.palette.background.paper,
            transform: "translateY(-60px) scale(0.99)",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        <List
          sx={{
            width: 250,
            borderRadius: "15px",
            padding: "5px",
          }}
        >
          {/* Theme Toggle */}
          <ListItem
            sx={{
              borderRadius: "15px",
              "&:hover": { backgroundColor: theme.palette.action.hover },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SvgIcon component={SettingsIcon} inheritViewBox sx={{ minWidth: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Theme" sx={{ minWidth: 40 }} />
            <Switch checked={theme.palette.mode === "dark"} onChange={toggleTheme} />
          </ListItem>

          {/* Delete All Chats */}
          <ListItem
            button
            onClick={handleDeleteAllChats}
            sx={{
              borderRadius: "15px",
              "&:hover": { backgroundColor: theme.palette.action.hover },
              minWidth: 40,
            }}
          >
            <ListItemIcon sx={{ minWidth: 20 }}>
              <SvgIcon component={DeleteIcon} inheritViewBox sx={{ minWidth: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Delete All Chats" sx={{ minWidth: 40 }} />
          </ListItem>

          {/* Contact Us */}
          <ListItem
            button
            onClick={handleContactClick}
            sx={{
              borderRadius: "15px",
              "&:hover": { backgroundColor: theme.palette.action.hover },
              minWidth: 40,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SvgIcon component={ContactIcon} inheritViewBox sx={{ minWidth: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Contact Us" sx={{ minWidth: 40 }} />
          </ListItem>

          {/* Logout */}
          <ListItem
            button
            onClick={handleLogoutClick}
            sx={{
              borderRadius: "15px",
              "&:hover": { backgroundColor: theme.palette.action.hover },
              minWidth: 40,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SvgIcon component={LogoutIcon} inheritViewBox sx={{ minWidth: 40 }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ minWidth: 40 }} />
          </ListItem>
        </List>
      </Popover>

      {/* Contact Popover */}
      <Popover
        open={Boolean(contactPopoverAnchorEl)}
        onClose={handleContactPopoverClose}
        anchorEl={contactPopoverAnchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableRestoreFocus
        PaperProps={{
          style: {
            borderRadius: "20px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme.palette.background.paper,
            transform: "translateY(-60px) scale(0.99)",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        <List
          sx={{
            width: 250,
            borderRadius: "15px",
            padding: "5px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              px: 2,
              py: 1.5,
              fontWeight: "bold",
              color: theme.palette.text.primary,
            }}
          >
            Contact Team
          </Typography>

          {contacts.map((contact, index) => (
            <ListItem
              key={index}
              button
              sx={{
                borderRadius: "15px",
                "&:hover": { backgroundColor: theme.palette.action.hover },
                py: 1,
                px: 2,
              }}
            >
              <ListItemText
                primary={contact.name}
                primaryTypographyProps={{
                  variant: "body1",
                  color: theme.palette.text.secondary,
                }}
              />
              <IconButton
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <SvgIcon
                  component={LinkedInIcon}
                  inheritViewBox
                  fontSize="small"
                />
              </IconButton>
            </ListItem>
          ))}

          <ListItem
            button
            onClick={handleContactPopoverClose}
            sx={{
              borderRadius: "15px",
              "&:hover": { backgroundColor: theme.palette.action.hover },
              py: 1,
              px: 2,
              mt: 1,
            }}
          >
            <ListItemText
              primary="Close"
              primaryTypographyProps={{
                variant: "body1",
                color: theme.palette.text.secondary,
              }}
            />
          </ListItem>
        </List>
      </Popover>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        onDeleteAllChats={onDeleteAllChats} 
        sx={{
          "& .MuiDialog-paper": {
            mt: 8,
            backgroundColor: theme.palette.background.paper,
            borderRadius: "20px",
            width: "600px",
            height: "fit-content",

          },
        }}
      >
        <DialogTitle>Delete All Chats</DialogTitle>
        <DialogContent>
          <Typography>If you confirm deletion, all chat history for this account will be permanently erased and cannot be recovered.</Typography>
          <Typography sx={{ paddingTop: "10px" }}>Are you sure you want to delete all chat history?</Typography>
        </DialogContent>
        <DialogActions sx={{ paddingRight: "15px" }}>
          <Button variant="contained" onClick={handleDeleteConfirmationClose}
            sx={{
              backgroundColor: "#555562",
              borderRadius: "10px",
              textTransform: "none",
              color: "#f8faff",
              transition: "background-color 0.3s ease-in-out",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#474756",
              },
            }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirmed}
            sx={{
              backgroundColor: "#d44344",
              color: "#ffffff",
              borderRadius: "10px",
              textTransform: "none",
              transition: "background-color 0.3s ease-in-out",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#8b3f45",
              },
            }}
          >
            Confirm Deletion
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutConfirmationOpen}
        onClose={handleLogoutConfirmationClose}
        sx={{
          "& .MuiDialog-paper": {
            mt: 8,
            backgroundColor: theme.palette.background.paper,
            borderRadius: "20px",
            width: "450px",
            height: "fit-content",
          },
        }}
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure? You will be redirected to login.</Typography>
        </DialogContent>
        <DialogActions sx={{ paddingRight: "15px" }}>
          <Button variant="contained" onClick={handleLogoutConfirmationClose}
            sx={{
              backgroundColor: "#555562",
              borderRadius: "10px",
              textTransform: "none",
              color: "#f8faff",
              transition: "background-color 0.3s ease-in-out",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#474756",
              },
            }}>Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirmed}
            sx={{
              backgroundColor: "#d44344",
              color: "#ffffff",
              borderRadius: "10px",
              textTransform: "none",
              transition: "background-color 0.3s ease-in-out",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#8b3f45",
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileDialog;
