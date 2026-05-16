import { BaseNode } from "../components/BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[
        {
          id: `${id}-system`,
          top: "35%",
        },
        {
          id: `${id}-prompt`,
          top: "65%",
        },
      ]}
      outputs={[
        {
          id: `${id}-response`,
        },
      ]}
    >
      <span className="text-sm text-slate-300">
        This is a LLM.
      </span>
    </BaseNode>
  );
};