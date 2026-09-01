export interface TelemetryState {
  x: number;
  y: number;
  speed: number;
  lastDisturbanceTime: number;
  activeStatus: string;
  statusLevel: 'normal' | 'analyzing' | 'detected' | 'alert';
  interactionCount: number;
  strainReading: number;
  frequency: number;
}

export interface DisturbancePulse {
  id: string;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color?: string;
  speed?: number;
  type?: 'move' | 'disturb' | 'escalate' | 'cursor';
}

export interface EnvironmentItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  telemetry: string;
  metric: string;
  metricLabel: string;
  features: string[];
}

export interface NervousNode {
  id: string;
  name: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  connections: string[];
  type: string;
  status: string;
}
