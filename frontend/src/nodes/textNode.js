

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";



export const TextNode = ({ id, data }) => {

  useEffect(() => {

  updateNodeField(
    id,
    "text",
    currText
  );

}, []);

  const [currText, setCurrText] = useState(
    data?.text || "{{input}}"
  );

  const textareaRef = useRef(null);

  const updateNodeField = useStore(
    (state) => state.updateNodeField
  );

  // Detect variables
  const variables = useMemo(() => {

    const regex =
      /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

    const matches = [...currText.matchAll(regex)];

    return [...new Set(matches.map((m) => m[1]))];

  }, [currText]);

  // Auto resize textarea
  useEffect(() => {

    if (textareaRef.current) {

      textareaRef.current.style.height = "auto";

      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }

  }, [currText]);

  const handleTextChange = (e) => {

    setCurrText(e.target.value);

    updateNodeField(
      id,
      "text",
      e.target.value
    );
  };

  return (
    <BaseNode
      title="Text"
      inputs={variables.map((variable, index) => ({
        id: `${id}-${variable}`,
        top: 80 + index * 35,
      }))}
      outputs={[
        {
          id: `${id}-output`,
        },
      ]}
    >
      <label className="flex flex-col gap-2 text-sm">

        <span className="text-slate-300">
          Text:
        </span>

        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="
            bg-[#020617]
            border border-slate-600
            rounded-lg
            p-3
            text-white
            outline-none
            resize-none
            w-full
            overflow-hidden
          "
        />
      </label>
    </BaseNode>
  );
};