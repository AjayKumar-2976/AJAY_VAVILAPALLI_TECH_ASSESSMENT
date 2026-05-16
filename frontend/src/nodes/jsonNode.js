import { BaseNode } from "../components/BaseNode";

export const JSONNode = ({ id, data }) => {
  return (
    <BaseNode
      title="JSON"
      outputs={[
        { id: `${id}-json` },
      ]}
    >
      <span className="text-sm text-slate-300">
        Structured JSON output.
      </span>
    </BaseNode>
  );
};