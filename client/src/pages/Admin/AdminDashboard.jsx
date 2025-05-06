import React from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  CardActions,
  useTheme,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Gavel as GavelIcon,
  People as PeopleIcon,
  Forum as ForumIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const adminActions = [
    {
      title: "User Registration",
      description: "Register new users to the system",
      icon: <PersonAddIcon sx={{ fontSize: 40 }} />,
      color: "#1976d2",
      onClick: () => navigate("/register"),
    },
    {
      title: "All Legal Cases",
      description: "Initialize and manage legal cases",
      icon: <GavelIcon sx={{ fontSize: 40 }} />,
      color: "#9c27b0",
      onClick: () => navigate("/all-legal-cases"),
    },
    {
      title: "All Users",
      description: "View and manage all system users",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "#2e7d32",
      onClick: () => navigate("/all-users"),
    },
    {
      title: "Lawyer Consultation",
      description: "Manage lawyer consultations",
      icon: <ForumIcon sx={{ fontSize: 40 }} />,
      color: "#ed6c02",
      onClick: () => navigate("/lawyer-consultation"),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              backgroundColor: "white",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mt:12, }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "#1a237e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <DashboardIcon sx={{ fontSize: 36 }} />
                Admin Dashboard
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Manage your legal system efficiently
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Action Cards */}
            <Grid container spacing={3}>
              {adminActions.map((action, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      },
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 64,
                          height: 64,
                          bgcolor: `${action.color}20`, // light background
                          borderRadius: "50%",
                          mb: 2,
                          color: action.color,
                        }}
                      >
                        {action.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: "#1a237e",
                        }}
                      >
                        {action.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {action.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={action.onClick}
                        sx={{
                          backgroundColor: action.color,
                          "&:hover": {
                            backgroundColor: action.color,
                            opacity: 0.9,
                          },
                          borderRadius: 2,
                        }}
                      >
                        Access
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Help Text */}
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Need help? Contact system administrator
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default AdminDashboard;