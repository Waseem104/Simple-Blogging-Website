import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/my-blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted Successfully!");
        window.location.reload();
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log("error in handle delete", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "15px", boxShadow: 3 }}>
      {isUser && (
        <Box display={"flex"}>
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleEdit}>
            <EditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgColor: red[500], fontSize: "1.2rem" }}
            aria-label="recipe"
          >
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
        sx={{ paddingBottom: 1 }}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
        sx={{ borderRadius: "8px" }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ paddingTop: 0 }}>
        <IconButton aria-label="add to favorites" sx={{ color: red[500] }}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" sx={{ color: "text.secondary" }}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
