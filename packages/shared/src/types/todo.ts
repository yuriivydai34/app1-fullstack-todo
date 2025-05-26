export interface Todo {
  id?: string;
  text: string;
  status?: 'undone' | 'completed';
}

export interface TodoCreateInput {
  text: string;
  status?: 'undone' | 'completed';
}

export interface TodoUpdateInput {
  id: string;
  text?: string;
  status?: 'undone' | 'completed';
} 