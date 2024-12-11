import React, { useState, useRef } from 'react';
import { Terminal, Play, Square } from 'lucide-react';
import { pullKaliImage, runKaliContainer, executeKaliCommand } from '../utils/docker/commands';

export const CLIMode: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [command, setCommand] = useState('');
  const [containerRunning, setContainerRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const appendOutput = (text: string) => {
    setOutput(prev => [...prev, text]);
    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 100);
  };

  const startKaliContainer = async () => {
    setLoading(true);
    try {
      appendOutput('> Pulling Kali Linux image...');
      const pullResult = await pullKaliImage();
      appendOutput(pullResult);
      
      appendOutput('> Starting Kali Linux container...');
      await runKaliContainer();
      appendOutput('> Container started successfully');
      appendOutput('> Kali Linux tools are now available');
      setContainerRunning(true);
    } catch (error) {
      appendOutput(`> Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    appendOutput(`> ${command}`);
    try {
      const result = await executeKaliCommand(command);
      appendOutput(result);
    } catch (error) {
      appendOutput(`> Error: ${error.message}`);
    }
    setCommand('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Terminal className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold">Kali Linux Terminal</h2>
          </div>
          <button
            onClick={startKaliContainer}
            disabled={loading || containerRunning}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {containerRunning ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Running
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Container
              </>
            )}
          </button>
        </div>

        <div 
          ref={outputRef}
          className="bg-black rounded-lg p-4 h-[500px] overflow-y-auto mb-4"
        >
          {output.map((line, index) => (
            <div key={index} className="mb-2">{line}</div>
          ))}
          {loading && (
            <div className="animate-pulse">Loading...</div>
          )}
        </div>

        <form onSubmit={handleCommand} className="flex gap-4">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder={containerRunning ? "Enter command..." : "Start container first..."}
            disabled={!containerRunning}
            className="flex-1 bg-black text-green-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!containerRunning || !command.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Execute
          </button>
        </form>
      </div>
    </div>
  );
};