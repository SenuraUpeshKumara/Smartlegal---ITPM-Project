import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ClientDashboard from './pages/components/ClientDashboard';
import RegisterLegalCase from './pages/Client/CaseRegister';
import ViewCaseDetails from './pages/Client/CaseViewDetails';
import UpdateLegalCase from './pages/Client/CaseUpdate';

import PrintCaseDetails from './pages/Client/CasePrint';

import AdminDashboard from './pages/Admin/AdminDashboard';
import AllLegalCases from './pages/Admin/CaseAll';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<ClientDashboard />} />
        <Route path='/add-legal-case' element={<RegisterLegalCase />} />
        <Route path='/view-legal-case/:id' element={<ViewCaseDetails />} />
        <Route path="/update-case-details/:id" element={<UpdateLegalCase/>} />
        <Route path="/print-case/:id" element={<PrintCaseDetails/>} />


        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/all-legal-cases" element={<AllLegalCases/>} />

        
      </Routes>
    </div>
  );
};

export default App;