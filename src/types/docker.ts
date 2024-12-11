export interface DockerContainer {
  id: string;
  status: 'created' | 'running' | 'paused' | 'stopped';
  name: string;
  ports: Record<number, number>;
}