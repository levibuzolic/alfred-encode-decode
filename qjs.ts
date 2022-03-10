import { getcwd } from 'os';

export function cwd(): string {
  const [dir] = getcwd();
  if (dir != null) return dir;
  return '';
}
