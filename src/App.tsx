import React, { Suspense, lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Refine } from "@refinedev/core";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/mui";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { dataProvider } from "./providers/data";
import { queryClient } from "./providers/queryClient";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

const Teams = lazy(() => import("./pages/teams/Teams"));
const Overview = lazy(() => import("./pages/overview/Overview"));


const Layout = () => (
  <ThemedLayout Title={() => null} Header={() => <Header sticky />} Sider={Sidebar}>
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  </ThemedLayout>
);

function App() {
  const isDev = import.meta.env.DEV;

  const AppContent = (
    <RefineKbarProvider>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider}
            notificationProvider={useNotificationProvider}
            routerProvider={routerProvider}
            resources={[{ name: "teams", list: "/teams" }]}
            options={{
              reactQuery: { clientConfig: queryClient },
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: import.meta.env.VITE_PROJECT_ID,
            }}
          >
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Overview />} />
                <Route path="teams" element={<Teams />} />
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </RefineKbarProvider>
  );

  return (
    <BrowserRouter>
      {isDev ? (
        <DevtoolsProvider>
          {AppContent}
          <DevtoolsPanel />
        </DevtoolsProvider>
      ) : (
        AppContent
      )}
    </BrowserRouter>
  );
}

export default App;