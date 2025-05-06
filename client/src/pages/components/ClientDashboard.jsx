import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import NavBar from "./NavBar"; // Your custom nav bar
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  Button,
  CardContent,
  CardActions,
  CircularProgress,
  Paper
} from "@mui/material";
import {
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon
} from "@mui/icons-material";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [loading] = useState(false); // Set to false for demo purposes

  const handleNavigation = (route) => {
    navigate(route);
  };

  const quickActions = [
    {
      title: "Book Consultation",
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      action: () => handleNavigation("/appointments"),
      color: "#e74c3c"
    },
    {
      title: "My Appointments",
      icon: <CalendarIcon sx={{ fontSize: 40 }} />,
      action: () => handleNavigation("/case-initiation"),
      color: "#f1c40f"
    },
    {
      title: "File a Legal Case",
      icon: <AddIcon sx={{ fontSize: 40 }} />,
      action: () => handleNavigation("/add-legal-case"),
      color: "#3498db"
    }
  ];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      
      {/* Replace old AppBar with your custom NavBar */}
      <NavBar />

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, mt: 8 }}> {/* mt: 8 to offset fixed navbar */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2, backgroundColor: "#ffffff" }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: "#2c3e50" }}>
            Welcome back, John Doe
          </Typography>
          <Typography variant="body1" sx={{ color: "#7f8c8d", mb: 4 }}>
            Manage your appointments and legal cases efficiently. Use the quick actions below to get started.
          </Typography>

          <Grid container spacing={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", py: 3 }}>
                    <Box sx={{ color: action.color, mb: 2 }}>{action.icon}</Box>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
                      {action.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      onClick={action.action}
                      sx={{
                        color: action.color,
                        "&:hover": {
                          backgroundColor: `${action.color}10`
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default ClientDashboard;