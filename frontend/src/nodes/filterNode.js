import { BaseNode } from "../components/BaseNode";

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      title="Filter"
      inputs={[
        { id: `${id}-input` },
      ]}
      outputs={[
        { id: `${id}-filtered` },
      ]}
    >
      <span className="text-sm text-slate-300">
        Filter incoming data.
      </span>
    </BaseNode>
  );
};