import { useStore } from "./store";
import axios from "axios";
import { toast } from "react-toastify";

export const SubmitButton = () => {

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {

    try {

      // -----------------------------
      // FIND INPUT NODE
      // -----------------------------
      const inputNode = nodes.find(
        (node) => node.type === "customInput"
      );

      // -----------------------------
      // FIND TEXT NODE
      // -----------------------------
      const textNode = nodes.find(
        (node) => node.type === "text"
      );

      let finalOutput = "";

      // -----------------------------
      // GENERATE OUTPUT
      // -----------------------------
      if (inputNode && textNode) {

        const inputValue =
          inputNode.data?.inputName ||
          inputNode.data?.name ||
          "";

        const textValue =
          textNode.data?.text ||
          "";

        finalOutput = textValue.replace(
          /{{\s*input\s*}}/g,
          inputValue
        );
      }

      // -----------------------------
      // API CALL
      // -----------------------------
      const response = await axios.post(
        "http://127.0.0.1:8000/pipelines/parse",
        {
          nodes,
          edges,
        }
      );

      const data = response.data;

      // -----------------------------
      // TOAST
      // -----------------------------
      toast.success(
        <div className="flex flex-col gap-2 text-sm">

          <span>
            ✅ Nodes: {data.num_nodes}
          </span>

          <span>
            🔗 Edges: {data.num_edges}
          </span>

          <span>
            🌳 Is DAG: {String(data.is_dag)}
          </span>

          <hr className="border-slate-600" />

          <span className="font-semibold text-cyan-300">
            Output:
          </span>

          <span className="text-white break-words">
            {finalOutput || "No Output"}
          </span>

        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        }
      );

    } catch (error) {

      toast.error("Pipeline failed");

      console.log(error);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">

      <button
        onClick={handleSubmit}
        className="
          bg-gradient-to-r
          from-violet-600
          to-cyan-500
          text-white
          px-8 py-3
          rounded-2xl
          font-semibold
          shadow-2xl
          hover:scale-105
          transition-all duration-200
        "
      >
        Submit
      </button>

    </div>
  );
};