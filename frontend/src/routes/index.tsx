// frontend/src/routes/index.tsx

import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import OemAuthPage from "../pages/OemAuthPage";
import AddAcntPage from "../pages/AddAcntPage";
import AuthAcntPage from "../pages/AuthAcntPage";
import ActivateEsimPage from "../pages/ActivateEsimPage";
import ReissueEsimPage from "../pages/ReissueEsimPage";
import CancelEsimPage from "../pages/CancelEsimPage";
import ChangeContractPage from "../pages/ChangeContractPage";
import LookupContractPage from "../pages/LookupContractPage";
import StatusCheck from "../pages/StatusCheck";

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/oem-auth", element: <OemAuthPage /> }, // ← これが重要
    { path: "/add-account", element: <AddAcntPage /> },
    { path: "/auth-account", element: <AuthAcntPage /> },
    { path: "/activate-esim", element: <ActivateEsimPage /> },
    { path: "/reissue-esim", element: <ReissueEsimPage /> },
    { path: "/cancel-esim", element: <CancelEsimPage /> },
    { path: "/change-contract", element: <ChangeContractPage /> },
    { path: "/lookup-contract", element: <LookupContractPage /> },
    { path: "/status-check", element: <StatusCheck /> },
  ]);

  return routes;
};

export default AppRoutes;
