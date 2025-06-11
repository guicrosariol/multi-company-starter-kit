import { rules, type Rule } from './role';

export class Permission {
  private userRole: string;
  private rules: Rule[];

  constructor(userRole: string) {
    this.userRole = userRole;
    this.rules = rules[userRole];
  }

  can(action: string, subject: string): boolean {
    return this.rules.some(rule =>
      (rule.action === action || rule.action === 'manage') &&
      (rule.subject === subject || rule.subject === 'all')
    );
  }

  cannot(action: string, subject: string): boolean {
    return !this.can(action, subject);
  }
}