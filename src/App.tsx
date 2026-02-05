import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { dataProvider } from "./providers/data";
import { queryClient } from "./providers/queryClient";
import { Teams } from "./pages/teams/Teams";
import { Overview } from "./pages/overview/Overview";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                resources={[{ name: "teams", list: "/teams" }]}
                options={{
                  reactQuery: { clientConfig: queryClient },
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: process.env.REACT_APP_PROJECT_ID,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayout
                        Title={() => null}
                        Header={() => <Header sticky />}
                        Sider={() => <Sidebar />}
                      >
                        <Outlet />
                      </ThemedLayout>
                    }
                  >
                    <Route index element={<Overview />} />
                    <Route path="teams" element={<Teams />} />
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
