

import { useState,useEffect } from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

export const InputNode = ({ id, data }) => {

  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );

  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
  );

  const updateNodeField = useStore(
    (state) => state.updateNodeField
  );

  useEffect(() => {

  updateNodeField(
    id,
    "inputName",
    currName
  );

  updateNodeField(
    id,
    "inputType",
    inputType
  );

}, []);

  const handleNameChange = (e) => {

    setCurrName(e.target.value);

    updateNodeField(
      id,
      "inputName",
      e.target.value
    );
  };

  const handleTypeChange = (e) => {

    setInputType(e.target.value);

    updateNodeField(
      id,
      "inputType",
      e.target.value
    );
  };

  return (
    <BaseNode
      title="Input"
      outputs={[
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
          value={inputType}
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
          <option value="File">File</option>
        </select>

      </label>

    </BaseNode>
  );
};