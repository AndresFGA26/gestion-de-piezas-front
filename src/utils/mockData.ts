import type { User, Project, Block, Piece } from '../types';

export const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
};

export const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Alpha Project',
  },
  {
    id: 2,
    name: 'Beta Project',
  },
];

export const mockBlocks: Block[] = [
  {
    id: 1,
    project_id: 1,
    name: 'Frontend Block',
  },
  {
    id: 2,
    project_id: 1,
    name: 'Backend Block',
  },
  {
    id: 3,
    project_id: 2,
    name: 'Design Block',
  },
];

export const mockPieces: Piece[] = [
  {
    id: 1,
    block_id: 1,
    peso_teorico: 10,
    peso_real: null,
    diferencia_peso: null,
    estado: 'Pendiente',
    fecha_fabricacion: null,
  },
  {
    id: 2,
    block_id: 1,
    peso_teorico: 15,
    peso_real: 14,
    diferencia_peso: -1,
    estado: 'Fabricada',
    fecha_fabricacion: '2026-05-03',
  },
  {
    id: 3,
    block_id: 2,
    peso_teorico: 20,
    peso_real: null,
    diferencia_peso: null,
    estado: 'Pendiente',
    fecha_fabricacion: null,
  },
];