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
import { Header } from "./components";
import { Sidebar } from "./components/SideBar";

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
                  projectId: "DUHrzK-A4rtNx-QyU3F0",
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
                    {/* TO DO IN NEXT STEPS */}
                    {/* <Route index element={<Overview />} /> */}
                    {/* <Route path="teams" element={<Teams />} /> */}
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
