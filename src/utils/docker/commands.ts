import { KaliManager } from './kaliManager';

export async function pullKaliImage(): Promise<string> {
  try {
    // Simulate Docker pull command
    return 'Successfully pulled kalilinux/kali-rolling image';
  } catch (error) {
    throw new Error(`Failed to pull Kali Linux image: ${error.message}`);
  }
}

export async function runKaliContainer(): Promise<void> {
  const manager = KaliManager.getInstance();
  await manager.startContainer();
}

export async function executeKaliCommand(command: string): Promise<string> {
  const manager = KaliManager.getInstance();
  return await manager.executeCommand(command);
}