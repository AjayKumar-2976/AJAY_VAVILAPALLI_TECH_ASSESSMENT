export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType })
    );

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      className="
        group
        relative
        overflow-hidden
        flex flex-col items-center justify-center
        gap-3

        bg-gradient-to-br
        from-[#111827]
        to-[#0f172a]

        border border-slate-700/70

        text-white

        px-5 py-5

        rounded-2xl

        cursor-grab

        transition-all duration-300

        hover:scale-105
        hover:border-cyan-500/40
        hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]

        active:scale-95

        min-w-[120px]
        min-h-[100px]
      "
    >

      {/* Glow Effect */}
      <div
        className="
          absolute inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-br
          from-cyan-500/10
          to-purple-500/10
        "
      />

      {/* Icon */}
      <div
        className="
          relative z-10
          text-cyan-400
          group-hover:scale-110
          transition-transform duration-300
        "
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className="
          relative z-10
          font-medium
          tracking-wide
          text-sm
        "
      >
        {label}
      </span>

    </div>
  );
};