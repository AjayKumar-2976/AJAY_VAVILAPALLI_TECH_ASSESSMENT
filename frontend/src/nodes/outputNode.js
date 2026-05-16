import { useState } from "react";
import { BaseNode } from "../components/BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName ||
      id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || "Text"
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      title="Output"
      inputs={[
        {
          id: `${id}-value`,
        },
      ]}
    >
      {/* Name */}
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-slate-300">
          Name:
        </span>

        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="
            bg-[#020617]
            border border-slate-600
            rounded-lg
            px-3 py-2
            text-white
            outline-none
          "
        />
      </label>

      {/* Type */}
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-slate-300">
          Type:
        </span>

        <select
          value={outputType}
          onChange={handleTypeChange}
          className="
            bg-[#020617]
            border border-slate-600
            rounded-lg
            px-3 py-2
            text-white
            outline-none
          "
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};