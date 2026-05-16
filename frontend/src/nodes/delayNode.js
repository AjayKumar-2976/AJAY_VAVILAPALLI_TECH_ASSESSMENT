import { BaseNode } from "../components/BaseNode";

export const DelayNode = ({ id, data }) => {
  return (
    <BaseNode
      title="Delay"
      inputs={[
        { id: `${id}-input` },
      ]}
      outputs={[
        { id: `${id}-output` },
      ]}
    >
      <span className="text-sm text-slate-300">
        Delay workflow execution.
      </span>
    </BaseNode>
  );
};