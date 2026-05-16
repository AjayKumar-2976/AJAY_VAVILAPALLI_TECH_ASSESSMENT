import { BaseNode } from "../components/BaseNode";

export const MathNode = ({ id, data }) => {
  return (
    <BaseNode
      title="Math"
      inputs={[
        { id: `${id}-a` },
        { id: `${id}-b` },
      ]}
      outputs={[
        { id: `${id}-result` },
      ]}
    >
      <span className="text-sm text-slate-300">
        Perform calculations.
      </span>
    </BaseNode>
  );
};