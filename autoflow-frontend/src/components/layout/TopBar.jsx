import React, { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { workflowAPI } from '../../api/client';
import { Save, Play, Square, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // Fallback if uuid isn't installed

export default function TopBar() {
  const { nodes, edges, currentWorkflow, isActive, setIsActive, setCurrentWorkflow } = useWorkflowStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const workflowId = currentWorkflow?.id;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        name: currentWorkflow?.name || 'Untitled Workflow',
        description: currentWorkflow?.description || '',
        nl_input: currentWorkflow?.nl_input || '',
        nodes,
        edges,
      };
      
      let idToUse = workflowId || uuidv4();
      await workflowAPI.save(idToUse, payload);
      
      if (!workflowId) {
        setCurrentWorkflow({ ...payload, id: idToUse });
      }
      alert('Saved successfully!');
    } catch (e) {
      alert('Failed to save: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async () => {
    if (!workflowId) {
        alert("Please save the workflow first.");
        return;
    }
    
    setIsToggling(true);
    try {
        if (isActive) {
            await workflowAPI.deactivate(workflowId);
            setIsActive(false);
        } else {
            await workflowAPI.activate(workflowId);
            setIsActive(true);
        }
    } catch (e) {
        alert('Failed to toggle status: ' + e.message);
    } finally {
        setIsToggling(false);
    }
  };

  return (
    <div className="h-16 bg-dark-900 border-b border-white/10 flex items-center justify-between px-6 z-50 shadow-md">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white tracking-tight">AutoFlow OSS</h1>
        {currentWorkflow && (
            <div className="flex items-center gap-2 px-3 py-1 bg-dark-800 rounded-md border border-white/5">
                <span className="text-sm text-gray-300">{currentWorkflow.name}</span>
                <span className="flex h-2 w-2 relative">
                  {isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </span>
            </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-200 rounded-lg text-sm font-medium transition-colors border border-white/10"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
          Save
        </button>

        <button 
          onClick={handleToggleActive} 
          disabled={isToggling || nodes.length === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isToggling ? (
              <Loader2 size={16} className="animate-spin" />
          ) : isActive ? (
              <><Square size={16} /> Deactivate</>
          ) : (
              <><Play size={16} /> Activate</>
          )}
        </button>
      </div>
    </div>
  );
}
