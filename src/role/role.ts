export type Rule = {
  action: string;
  subject: string;
};

export const rules: Record<string, Rule[]> = {
  admin: [
    { action: 'manage', subject: 'all' },
  ],
  editor: [
    { action: 'create', subject: 'Post' },
    { action: 'update', subject: 'Post' },
    { action: 'read', subject: 'Post' },
  ],
  viewer: [
    { action: 'read', subject: 'Post' },
  ],
};
