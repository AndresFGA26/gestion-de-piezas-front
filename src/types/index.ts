import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});
export type User = z.infer<typeof UserSchema>;

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const BlockSchema = z.object({
  id: z.number(),
  project_id: z.number(),
  name: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type Block = z.infer<typeof BlockSchema>;

export const PieceSchema = z.object({
  id: z.number(),
  block_id: z.number(),
  peso_teorico: z.string().or(z.number()),
  peso_real: z.string().or(z.number()).nullable(),
  diferencia_peso: z.string().or(z.number()).nullable(),
  estado: z.enum(['Pendiente', 'Fabricada']).or(z.string()),
  fecha_fabricacion: z.string().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type Piece = z.infer<typeof PieceSchema>;

// Types for the Report
export interface ReportTotals {
  [key: string]: number;
}

export interface ProjectStats {
  Fabricada: number;
  Pendiente: number;
  Total: number;
}

export interface ReportProject {
  id: number;
  name: string;
  stats: ProjectStats;
}

export interface ReportData {
  totals: ReportTotals;
  projects: ReportProject[];
}
