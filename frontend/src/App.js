import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020617]">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a33,transparent_40%)]" />

      {/* Grid Effect */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Hero Section */}
    {/* Hero Section */}
<div className="absolute top-4 left-1/2 -translate-x-1/2 text-center z-50 px-4">

  <h1 className="text-3xl font-bold text-white tracking-tight">
    AI Workflow Pipeline Builder
  </h1>

<p className="text-slate-400 mt-3 text-base">
  Build scalable AI workflows visually using reusable dynamic nodes.
</p>

</div>
      {/* Toolbar */}
      <PipelineToolbar />

      {/* Pipeline Canvas */}
      <PipelineUI />

      {/* Submit Button */}
      <SubmitButton />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
      />

    </div>
  );
}

export default App;