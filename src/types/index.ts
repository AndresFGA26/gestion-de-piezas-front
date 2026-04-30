import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});
export type User = z.infer<typeof UserSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const BlockSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
});
export type Block = z.infer<typeof BlockSchema>;

export const PieceSchema = z.object({
  id: z.string(),
  blockId: z.string(),
  name: z.string(),
  content: z.string(),
});
export type Piece = z.infer<typeof PieceSchema>;
