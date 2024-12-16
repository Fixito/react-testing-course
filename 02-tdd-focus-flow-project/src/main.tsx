import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FlowProvider from "./FlowContext.tsx";
import AppWithContext from "./AppWithContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlowProvider>
      <AppWithContext />
    </FlowProvider>
  </StrictMode>,
);
