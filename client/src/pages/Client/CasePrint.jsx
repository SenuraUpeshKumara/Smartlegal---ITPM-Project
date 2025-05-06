import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";

const PrintCaseDetails = () => {
  const { id } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const printRef = useRef(); // Reference to the printable content
  const [loading, setLoading] = useState(true);

  // Fetch case details by ID
  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/legalcase/get-legal-case/${id}`);
        if (response.data.success) {
          setCaseDetails(response.data.case);
        }
      } catch (error) {
        console.error("Error fetching case details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseDetails();
  }, [id]);

  // Handle PDF generation
  const handlePrint = () => {
    const doc = new jsPDF();
  
    // Constants
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const lineHeight = 12;
    const topMargin = 35;
    const leftMargin = 20;
    const rightMargin = pageWidth - 20;
  
    // Colors
    const primaryColor = "#003366"; // Dark blue
    const secondaryColor = "#DDEAF6"; // Light blue background
    const textColor = "#000000";
  
    // Helper: Add header with logo and title
    const resetYAndAddHeader = () => {
      y = topMargin;
      // Add Logo (optional): doc.addImage(imageData, "PNG", leftMargin, 10, 20, 20);
  
      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(primaryColor);
      doc.text("Legal Case Details", pageWidth / 2, 20, { align: "center" });
  
      // Reset font for body
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(textColor);
    };
  
    // Helper: Styled section title
    const addSectionTitle = (title) => {
      doc.setFillColor(221, 234, 246); // Light blue
      doc.roundedRect(leftMargin - 2, y - 10, pageWidth - 2 * leftMargin + 4, 14, 3, 3, 'F');
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor);
      doc.text(title, leftMargin, y);
      y += lineHeight * 1.5;
      doc.setDrawColor(180);
      doc.line(leftMargin, y, rightMargin, y);
      y += lineHeight;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(textColor);
    };
  
    // Helper: Field display with icons (optional)
    const addField = (label, value) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#1A1A1A");
      doc.text(`${label}:`, leftMargin, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(textColor);
      y = addWrappedText(value, leftMargin + 45, y, pageWidth - leftMargin - 45);
      y += lineHeight;
    };
  
    // Helper: Wrap & page break
    const addWrappedText = (text, x, y, maxWidth = 150) => {
      const lines = doc.splitTextToSize(text || "N/A", maxWidth);
      lines.forEach((line) => {
        if (y > pageHeight - 30) {
          doc.addPage();
          currentPage++;
          resetYAndAddHeader();
        }
        doc.text(line, x, y);
        y += lineHeight;
      });
      return y;
    };
  
    // Footer
    const addFooter = (pageIndex, totalPages) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor("#666666");
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, leftMargin, pageHeight - 15);
      doc.text(`Page ${pageIndex} of ${totalPages}`, pageWidth - 50, pageHeight - 15);
    };
  
    // Begin building PDF
    let y = topMargin;
    let currentPage = 1;
    resetYAndAddHeader();
  
    // Sections
    addSectionTitle("General Information");
    addField("Case Title", caseDetails.caseTitle || "N/A");
    addField("Case Type", caseDetails.caseType || "N/A");
    addField("Case Description", caseDetails.caseDescription || "N/A");
  
    doc.addPage();
    currentPage++;
    resetYAndAddHeader();
    addSectionTitle("Plaintiff Information");
    addField("Name", caseDetails.plaintiff?.plaintiffName || "N/A");
    addField("Email", caseDetails.plaintiff?.plaintiffEmail || "N/A");
    addField("Home Address", caseDetails.plaintiff?.plaintiffHomeAddress || "N/A");
    addField("Business Address", caseDetails.plaintiff?.plaintiffBusinessAddress || "N/A");
    addField("Contact Number", caseDetails.plaintiff?.plaintiffContactNo || "N/A");
    addField("Date of Birth", caseDetails.plaintiff?.plaintiffDOB || "N/A");
    addField("NIC", caseDetails.plaintiff?.plaintiffNIC || "N/A");
    addField("EIN", caseDetails.plaintiff?.plaintiffEIN || "N/A");
    addField("TIN", caseDetails.plaintiff?.plaintiffTIN || "N/A");
  
    doc.addPage();
    currentPage++;
    resetYAndAddHeader();
    addSectionTitle("Defendant Information");
    addField("Name", caseDetails.defendant?.defendantName || "N/A");
    addField("Email", caseDetails.defendant?.defendantEmail || "N/A");
    addField("Home Address", caseDetails.defendant?.defendantHomeAddress || "N/A");
    addField("Business Address", caseDetails.defendant?.defendantBusinessAddress || "N/A");
    addField("Contact Number", caseDetails.defendant?.defendantContactNo || "N/A");
    addField("Date of Birth", caseDetails.defendant?.defendantDOB || "N/A");
    addField("NIC", caseDetails.defendant?.defendantNIC || "N/A");
    addField("EIN", caseDetails.defendant?.defendantEIN || "N/A");
    addField("TIN", caseDetails.defendant?.defendantTIN || "N/A");
  
    doc.addPage();
    currentPage++;
    resetYAndAddHeader();
    addSectionTitle("Lawyer Information");
    addField("Full Name", caseDetails.lawyer?.LawyerFullName || "N/A");
    addField("Firm Name", caseDetails.lawyer?.lawFirmName || "N/A");
    addField("Office Address", caseDetails.lawyer?.contactInfo?.officeAddress || "N/A");
    addField("Phone Number", caseDetails.lawyer?.contactInfo?.phoneNo || "N/A");
    addField("Email", caseDetails.lawyer?.contactInfo?.email || "N/A");
    addField("Bar Association ID", caseDetails.lawyer?.barRegistration?.barAssociationID || "N/A");
    addField("Date of Admission", caseDetails.lawyer?.barRegistration?.dateOfAdmission || "N/A");
  
    doc.addPage();
    currentPage++;
    resetYAndAddHeader();
    addSectionTitle("Evidence Files");
  
    if (caseDetails.evidenceFiles && caseDetails.evidenceFiles.length > 0) {
      caseDetails.evidenceFiles.forEach((file) => {
        const fileName = file.fileName || "Unnamed File";
        const fileExtension = fileName.split(".").pop().toUpperCase();
        addField("File", `${fileName} (${fileExtension})`);
      });
    } else {
      addField("File", "No evidence files uploaded.");
    }
  
    // Add footers
    for (let i = 1; i <= currentPage; i++) {
      doc.setPage(i);
      addFooter(i, currentPage);
    }
  
    // Save file
    doc.save(`Case_${caseDetails.caseTitle.replace(/\s+/g, "_")}.pdf`);
  };
  

  if (loading) return <Typography>Loading...</Typography>;
  if (!caseDetails) return <Typography>Case not found.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Printable content container */}
        <Box ref={printRef}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" gutterBottom>
              <strong>{caseDetails.caseTitle}</strong>
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Case Type:</strong> {caseDetails.caseType}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Status:</strong> {caseDetails.caseStatus}
            </Typography>
          </Box>

          {/* General Information Section */}
          <Card elevation={1} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                General Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Case Title:</strong> {caseDetails.caseTitle}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Case Type:</strong> {caseDetails.caseType}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Case Description:</strong> {caseDetails.caseDescription}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Plaintiff Information Section */}
          <Card elevation={1} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Plaintiff Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Name:</strong> {caseDetails.plaintiff.plaintiffName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Email:</strong> {caseDetails.plaintiff.plaintiffEmail}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Home Address:</strong> {caseDetails.plaintiff.plaintiffHomeAddress}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Business Address:</strong> {caseDetails.plaintiff.plaintiffBusinessAddress}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Contact Number:</strong> {caseDetails.plaintiff.plaintiffContactNo}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Date of Birth:</strong> {caseDetails.plaintiff.plaintiffDOB}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>NIC:</strong> {caseDetails.plaintiff.plaintiffNIC}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>EIN:</strong> {caseDetails.plaintiff.plaintiffEIN}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>TIN:</strong> {caseDetails.plaintiff.plaintiffTIN}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Defendant Information Section */}
          <Card elevation={1} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Defendant Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Name:</strong> {caseDetails.defendant.defendantName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Email:</strong> {caseDetails.defendant.defendantEmail}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Home Address:</strong> {caseDetails.defendant.defendantHomeAddress}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Business Address:</strong> {caseDetails.defendant.defendantBusinessAddress}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Contact Number:</strong> {caseDetails.defendant.defendantContactNo}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Date of Birth:</strong> {caseDetails.defendant.defendantDOB}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>NIC:</strong> {caseDetails.defendant.defendantNIC}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>EIN:</strong> {caseDetails.defendant.defendantEIN}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>TIN:</strong> {caseDetails.defendant.defendantTIN}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Lawyer Information Section */}
          <Card elevation={1} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lawyer Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Full Name:</strong> {caseDetails.lawyer.LawyerFullName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Firm Name:</strong> {caseDetails.lawyer.lawFirmName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Office Address:</strong> {caseDetails.lawyer.contactInfo.officeAddress}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Phone Number:</strong> {caseDetails.lawyer.contactInfo.phoneNo}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Email:</strong> {caseDetails.lawyer.contactInfo.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Bar Association ID:</strong> {caseDetails.lawyer.barRegistration.barAssociationID}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Date of Admission:</strong> {caseDetails.lawyer.barRegistration.dateOfAdmission}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Evidence Files Section */}
          <Card elevation={1} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Uploaded Evidence Files
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {caseDetails.evidenceFiles && caseDetails.evidenceFiles.length > 0 ? (
                <Grid container spacing={2}>
                  {caseDetails.evidenceFiles.map((file, index) => (
                    <Grid item xs={12} key={index}>
                      <Typography>
                        <strong>File:</strong> {file.fileName}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography>No evidence files uploaded.</Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Print Button */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Download PDF
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrintCaseDetails;