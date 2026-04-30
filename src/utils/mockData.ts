import type { User, Project, Block, Piece } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
};

export const mockProjects: Project[] = [
  { id: 'p1', name: 'Alpha Project', description: 'The first project' },
  { id: 'p2', name: 'Beta Project', description: 'The second project' },
];

export const mockBlocks: Block[] = [
  { id: 'b1', projectId: 'p1', name: 'Frontend Block' },
  { id: 'b2', projectId: 'p1', name: 'Backend Block' },
  { id: 'b3', projectId: 'p2', name: 'Design Block' },
];

export const mockPieces: Piece[] = [
  { id: 'pc1', blockId: 'b1', name: 'React Setup', content: 'Init Vite' },
  { id: 'pc2', blockId: 'b1', name: 'Router Setup', content: 'TanStack Router' },
];
