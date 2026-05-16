// import { Handle, Position } from "reactflow";

// export const BaseNode = ({
//   title,
//   children,
//   inputs = [],
//   outputs = [],
// }) => {
//   return (
//     <div
//       className="
//         relative
//         overflow-hidden

//         bg-[#0f172a]/95
//         backdrop-blur-xl

//         border border-slate-700/70

//         rounded-3xl

//         shadow-[0_0_40px_rgba(15,23,42,0.6)]

//         min-w-[280px]

//         text-white

//         transition-all duration-300

//         hover:border-cyan-500/40
//         hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]
//         hover:-translate-y-1
//       "
//     >

//       {/* Ambient Glow */}
//       <div
//         className="
//           absolute inset-0
//           bg-gradient-to-br
//           from-cyan-500/5
//           to-purple-500/5
//           pointer-events-none
//         "
//       />

//       {/* Header */}
//       <div
//         className="
//           relative z-10

//           flex items-center justify-between

//           px-5 py-4

//           border-b border-slate-700/70

//           bg-gradient-to-r
//           from-purple-600/20
//           to-cyan-500/20
//         "
//       >

//         <span className="font-semibold tracking-wide text-lg">
//           {title}
//         </span>

//         <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

//       </div>

//       {/* Content */}
//       <div className="relative z-10 p-5 flex flex-col gap-4">
//         {children}
//       </div>

//       {/* Input Handles */}
//       {inputs.map((input, index) => (
//         <Handle
//           key={input.id}
//           type="target"
//           position={Position.Left}
//           id={input.id}
//           style={{
//             top: input.top || 90 + index * 40,
//             background: "#8b5cf6",
//             width: 12,
//             height: 12,
//             border: "2px solid #c4b5fd",
//             boxShadow: "0 0 12px rgba(139,92,246,0.6)",
//           }}
//         />
//       ))}

//       {/* Output Handles */}
//       {outputs.map((output, index) => (
//         <Handle
//           key={output.id}
//           type="source"
//           position={Position.Right}
//           id={output.id}
//           style={{
//             top: output.top || 90 + index * 40,
//             background: "#06b6d4",
//             width: 12,
//             height: 12,
//             border: "2px solid #67e8f9",
//             boxShadow: "0 0 12px rgba(6,182,212,0.6)",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

import { Handle, Position } from "reactflow";

export const BaseNode = ({
  title,
  children,
  inputs = [],
  outputs = [],
}) => {
  return (
    <div
      className="
        bg-[#0f172a]
        border border-slate-700
        rounded-2xl
        shadow-xl
        min-w-[220px]
        text-white
        overflow-visible
        relative
      "
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700 bg-gradient-to-r from-purple-600/20 to-cyan-500/20">
        <span className="font-semibold tracking-wide text-lg">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-4 text-sm">
        {children}
      </div>

      {/* INPUT HANDLES */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          isConnectable={true}
          style={{
            top: input.top || 70 + index * 35,
            left: -10,
            width: 16,
            height: 16,
            borderRadius: "999px",
            background: "#a855f7",
            border: "2px solid white",
            cursor: "crosshair",
            zIndex: 1000,
          }}
        />
      ))}

      {/* OUTPUT HANDLES */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          isConnectable={true}
          style={{
            top: output.top || 70 + index * 35,
            right: -10,
            width: 16,
            height: 16,
            borderRadius: "999px",
            background: "#06b6d4",
            border: "2px solid white",
            cursor: "crosshair",
            zIndex: 1000,
          }}
        />
      ))}
    </div>
  );
};