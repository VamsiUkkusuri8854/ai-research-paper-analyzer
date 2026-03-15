import React, { useMemo, useEffect, useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Handle, 
  Position, 
  MarkerType,
  useNodesState,
  useEdgesState,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Info, Zap, Search, Database, Cpu, 
  ClipboardCheck, Flag, X, ArrowRight,
  BookOpen, Layers, Terminal, Sparkles
} from 'lucide-react';

const getPhaseIcon = (phase) => {
  const p = phase?.toLowerCase() || '';
  if (p.includes('planning') || p.includes('research')) return <Search size={20} />;
  if (p.includes('data')) return <Database size={20} />;
  if (p.includes('model')) return <Cpu size={20} />;
  if (p.includes('evaluation')) return <ClipboardCheck size={20} />;
  if (p.includes('conclusion')) return <Flag size={20} />;
  return <Zap size={20} />;
};

const WorkflowNode = ({ data }) => {
  return (
    <div className={`workflow-node-premium phase-${data.phase?.toLowerCase() || 'default'}`}>
      <div className="node-phase-badge">
        {data.phase || 'Research Step'}
      </div>
      <div className="node-header">
        <div className="node-icon-wrapper">
          {getPhaseIcon(data.phase)}
        </div>
        <span className="node-step-label">{data.label || 'Step'}</span>
      </div>
      <div className="node-content">
        <p className="node-description">{data.description || 'No description available'}</p>
      </div>
      <div className="node-footer">
        <div className="click-hint">
          <Info size={12} />
          <span>Click for research snippet</span>
        </div>
      </div>
      
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ background: 'var(--primary)', border: 'none', width: '10px', height: '10px' }} 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ background: 'var(--primary)', border: 'none', width: '10px', height: '10px' }} 
      />
    </div>
  );
};

const nodeTypes = {
  workflowNode: WorkflowNode,
};

export default function WorkflowDiagram({ workflow }) {
  const [selectedNode, setSelectedNode] = useState(null);

  // Generate nodes and edges from workflow data
  const { initialNodes, initialEdges } = useMemo(() => {
    if (!workflow || !Array.isArray(workflow) || workflow.length === 0) {
      return { initialNodes: [], initialEdges: [] };
    }

    const nodes = workflow.map((item, index) => ({
      id: `node-${index}`,
      type: 'workflowNode',
      data: { 
        label: item.step, 
        description: item.description,
        reference: item.reference,
        phase: item.phase
      },
      // Horizontal spacing with a bit of vertical stagger for visual interest if many nodes
      position: { x: index * 450, y: (index % 2 === 0 ? 150 : 250) },
    }));

    const edges = workflow.slice(0, -1).map((_, index) => ({
      id: `edge-${index}`,
      source: `node-${index}`,
      target: `node-${index + 1}`,
      animated: true,
      style: { stroke: 'var(--primary)', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'var(--primary)',
        width: 20,
        height: 20,
      },
    }));

    return { initialNodes: nodes, initialEdges: edges };
  }, [workflow]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync state if workflow changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  if (!workflow || !Array.isArray(workflow) || workflow.length === 0) {
    return (
      <div className="empty-workflow">
        <p>No workflow data available for this paper.</p>
      </div>
    );
  }

  const onNodeClick = (event, node) => {
    setSelectedNode(node.data);
  };

  return (
    <div className="workflow-visualization-wrapper animate-slide-up">
      <div className="workflow-container-fullscreen">
        <div className="card-header" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={20} color="var(--primary)" /> 
            <span style={{ fontWeight: 600 }}>Research Workflow Pipeline</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            8-12 Extracted Research Stages
          </div>
        </div>
        
        <div style={{ width: '100%', height: 'calc(100% - 53px)', position: 'relative' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
            fitViewOptions={{ padding: 0.2, includeHiddenNodes: true }}
            minZoom={0.1}
            maxZoom={1}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            attributionPosition="bottom-right"
            nodesConnectable={false}
            nodesDraggable={true}
            elementsSelectable={true}
          >
            <Background color="rgba(255,255,255,0.03)" gap={30} />
            <Controls />
            <Panel position="top-right">
              <div className="panel-hint premium">
                <Sparkles size={14} color="var(--primary)" />
                <span>Interactive Pipeline Extraction</span>
              </div>
            </Panel>
          </ReactFlow>

          {/* Detailed Explanation Overlay */}
          {selectedNode && (
            <div className="node-detail-panel animate-slide-right">
              <div className="detail-panel-header">
                <div className="detail-phase-tag">{selectedNode.phase}</div>
                <button className="close-panel-btn" onClick={() => setSelectedNode(null)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="detail-panel-content">
                <h3 className="detail-title">{selectedNode.label}</h3>
                <p className="detail-description">{selectedNode.description}</p>
                
                {selectedNode.reference && (
                  <div className="detail-reference-box">
                    <div className="reference-label">
                      <BookOpen size={14} /> Source Evidence
                    </div>
                    <p className="reference-text">"{selectedNode.reference}"</p>
                  </div>
                )}

                <div className="detail-footer-tips">
                  <div className="tip-item">
                    <Layers size={14} />
                    <span>Click another node to compare stages</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
