import { DraggableNode } from "./draggableNode";

import { useStore } from "./store";

import {
  Database,
  Brain,
  FileText,
  ArrowRightLeft,
  Globe,
  Filter,
  Braces,
  Calculator,
  Timer,
} from "lucide-react";

export const PipelineToolbar = () => {

  const nodes = useStore((state) => state.nodes);

  const compactMode = nodes.length > 0;

  return (

    <div
      className={`
        fixed z-50 left-1/2 -translate-x-1/2
        transition-all duration-500

        ${
          compactMode
            ? "top-4"
            : "top-52"
        }
      `}
    >

      <div
        className={`
          bg-[#0f172a]/85
          backdrop-blur-2xl
          border border-slate-700/70
          rounded-3xl
          shadow-[0_0_60px_rgba(139,92,246,0.15)]
          transition-all duration-500

          ${
            compactMode
              ? "px-4 py-3"
              : "px-8 py-6"
          }
        `}
      >

        {/* Hide title in compact mode */}
        {!compactMode && (

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-white text-lg font-semibold">
                Workflow Nodes
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Drag and drop nodes into the canvas
              </p>

            </div>

            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />

          </div>
        )}

        {/* Nodes */}
        <div
          className={`
            grid gap-3 transition-all duration-500

            ${
              compactMode
                ? "grid-cols-9"
                : "grid-cols-5"
            }
          `}
        >

          <DraggableNode
            type="customInput"
            label="Input"
            icon={<Database size={18} />}
          />

          <DraggableNode
            type="llm"
            label="LLM"
            icon={<Brain size={18} />}
          />

          <DraggableNode
            type="customOutput"
            label="Output"
            icon={<ArrowRightLeft size={18} />}
          />

          <DraggableNode
            type="text"
            label="Text"
            icon={<FileText size={18} />}
          />

          <DraggableNode
            type="api"
            label="API"
            icon={<Globe size={18} />}
          />

          <DraggableNode
            type="filter"
            label="Filter"
            icon={<Filter size={18} />}
          />

          <DraggableNode
            type="json"
            label="JSON"
            icon={<Braces size={18} />}
          />

          <DraggableNode
            type="math"
            label="Math"
            icon={<Calculator size={18} />}
          />

          <DraggableNode
            type="delay"
            label="Delay"
            icon={<Timer size={18} />}
          />

        </div>
      </div>
    </div>
  );
};