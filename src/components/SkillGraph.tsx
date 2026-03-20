import React, { useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  Handle,
  Position,
  NodeProps,
  Edge,
  Node
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Brain, Code, Cpu, Smartphone } from 'lucide-react';

const SkillNode = ({ data }: NodeProps) => {
  return (
    <div className="px-4 py-2 shadow-xl glass-card border border-cyan/20 min-w-[150px] relative group">
      <Handle type="target" position={Position.Top} className="!bg-cyan" />
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan/10 rounded-lg text-cyan glow-cyan">
          {data.icon}
        </div>
        <div>
          <div className="text-xs font-mono text-cyan/60 uppercase tracking-tighter">Skill Node</div>
          <div className="text-sm font-bold">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-purple" />
    </div>
  );
};

const ProjectNode = ({ data }: NodeProps) => {
  return (
    <div className="px-4 py-2 shadow-xl glass-card border border-purple/20 min-w-[150px] relative">
      <Handle type="target" position={Position.Top} className="!bg-purple" />
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple/10 rounded-lg text-purple glow-purple">
          <Code size={16} />
        </div>
        <div>
          <div className="text-xs font-mono text-purple/60 uppercase tracking-tighter">Project</div>
          <div className="text-sm font-bold">{data.label}</div>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  skill: SkillNode,
  project: ProjectNode,
};

const SkillGraph = () => {
  const initialNodes: Node[] = [
    { 
      id: 'python', 
      type: 'skill', 
      data: { label: 'Python', icon: <Code size={16} /> }, 
      position: { x: 250, y: 0 } 
    },
    { 
      id: 'ml', 
      type: 'skill', 
      data: { label: 'Machine Learning', icon: <Brain size={16} /> }, 
      position: { x: 450, y: 0 } 
    },
    { 
      id: 'ai-agents', 
      type: 'skill', 
      data: { label: 'AI Agents', icon: <Cpu size={16} /> }, 
      position: { x: 50, y: 0 } 
    },
    { 
      id: 'flutter', 
      type: 'skill', 
      data: { label: 'Flutter', icon: <Smartphone size={16} /> }, 
      position: { x: 650, y: 0 } 
    },
    // Projects
    { id: 'flood', type: 'project', data: { label: 'Flood Detector' }, position: { x: 350, y: 150 } },
    { id: 'eduverse', type: 'project', data: { label: 'EduVerse' }, position: { x: 550, y: 150 } },
    { id: 'tapnex', type: 'project', data: { label: 'TAPnex' }, position: { x: 650, y: 250 } },
    { id: 'legalyze', type: 'project', data: { label: 'Legalyze' }, position: { x: 150, y: 150 } },
  ];

  const initialEdges: Edge[] = [
    { id: 'py-flood', source: 'python', target: 'flood', animated: true, style: { stroke: '#00f2ff' } },
    { id: 'ml-flood', source: 'ml', target: 'flood', animated: true, style: { stroke: '#00f2ff' } },
    { id: 'flutter-edu', source: 'flutter', target: 'eduverse', animated: true, style: { stroke: '#7000ff' } },
    { id: 'flutter-tap', source: 'flutter', target: 'tapnex', animated: true, style: { stroke: '#7000ff' } },
    { id: 'py-legal', source: 'python', target: 'legalyze', animated: true, style: { stroke: '#00f2ff' } },
  ];

  const onNodeClick = (_: any, node: Node) => {
    // This will be caught by the App component to log to the terminal
    const event = new CustomEvent('stitch-node-click', { 
      detail: { 
        id: node.id, 
        label: node.data.label,
        type: node.type 
      } 
    });
    window.dispatchEvent(event);
  };

  return (
    <section className="h-[600px] w-full relative py-20 bg-dark/50">
      <div className="absolute top-10 left-10 z-10">
        <h2 className="text-3xl font-bold mb-2">Neural Skill Network</h2>
        <p className="text-zinc-500 mono text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          Mapping cognitive assets to implementation nodes
        </p>
      </div>

      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        className="bg-transparent"
        selectNodesOnDrag={false}
      >
        <Background color="#111" gap={20} />
        <Controls showInteractive={false} className="!bg-surface !border-white/10" />
      </ReactFlow>
    </section>
  );
};

export default SkillGraph;
