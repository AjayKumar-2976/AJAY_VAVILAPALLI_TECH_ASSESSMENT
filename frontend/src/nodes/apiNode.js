import { BaseNode } from "../components/BaseNode";

export const APINode = ({ id, data }) => {
  return (
    <BaseNode
      title="API"
      inputs={[
        { id: `${id}-input` },
      ]}
      outputs={[
        { id: `${id}-response` },
      ]}
    >
      <span className="text-sm text-slate-300">
        Fetch external API data.
      </span>
    </BaseNode>
  );
};