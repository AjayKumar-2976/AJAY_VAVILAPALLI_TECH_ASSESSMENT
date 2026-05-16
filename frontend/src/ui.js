// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import { useStore } from './store';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  ConnectionMode,
} from "reactflow";
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

import { APINode } from "./nodes/apiNode";
import { FilterNode } from "./nodes/filterNode";
import { JSONNode } from "./nodes/jsonNode";
import { MathNode } from "./nodes/mathNode";
import { DelayNode } from "./nodes/delayNode";

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  text: TextNode,
  customOutput: OutputNode,

  api: APINode,
  filter: FilterNode,
  json: JSONNode,
  math: MathNode,
  delay: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return(
  <div
    ref={reactFlowWrapper}
    className="w-screen h-screen"
  >
    <ReactFlow
  fitView

    connectionMode={ConnectionMode.Loose}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onInit={setReactFlowInstance}
      nodeTypes={nodeTypes}
      proOptions={proOptions}
      snapGrid={[gridSize, gridSize]}
      connectionLineType="smoothstep"
      fitView
      defaultViewport={{ x: 0, y: 0, zoom: 1 }}
    >

      {/* Background */}
      <Background
        gap={24}
        size={1.5}
        color="#1e293b"
      />

      {/* Controls */}
      <Controls
        style={{
          background: "rgba(15,23,42,0.9)",
          color: "white",
          border: "1px solid #334155",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Minimap */}
      <MiniMap
        pannable
        zoomable
        position="top-right"
        style={{
          backgroundColor: "rgba(15,23,42,0.85)",
          width: 200,
          height: 130,
          border: "1px solid #334155",
          borderRadius: "18px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 30px rgba(139,92,246,0.2)",
        }}
        nodeColor="#8b5cf6"
        maskColor="rgba(15,23,42,0.6)"
      />

      {/* Empty State */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

          <div className="text-center">

            <h2 className="text-3xl font-semibold text-white">
              Start Building Your Workflow
            </h2>

            <p className="text-slate-400 mt-3 text-lg">
              Drag nodes from the toolbar to create AI pipelines visually
            </p>

          </div>

        </div>
      )}

    </ReactFlow>
  </div>
);
}
