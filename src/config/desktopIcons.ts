import { WindowId } from '@/types/desktop';

export interface DesktopIconDef {
  id: WindowId;
  label: string;
  icon: string;
  windowTitle: string;
}

export const desktopIcons: DesktopIconDef[] = [
  { id: 'about',      label: 'My Documents',   icon: '\uD83D\uDCC1', windowTitle: 'about_me.txt' },
  { id: 'experience', label: 'Quest Log',       icon: '\uD83D\uDCDC', windowTitle: 'quest_log.exe' },
  { id: 'links',      label: 'Internet',        icon: '\uD83C\uDF10', windowTitle: 'internet_explorer.exe' },
  { id: 'skills',     label: 'Skill Tree',      icon: '\u2B50',       windowTitle: 'skill_tree.exe' },
  { id: 'projects',   label: 'Projects',        icon: '\uD83D\uDE80', windowTitle: 'projects.exe' },
  { id: 'contact',    label: 'Email',           icon: '\uD83D\uDCE7', windowTitle: 'outlook_express.exe' },
];

export const defaultWindowSizes: Record<WindowId, { w: number; h: number }> = {
  about:      { w: 450, h: 380 },
  experience: { w: 520, h: 420 },
  links:      { w: 380, h: 340 },
  skills:     { w: 420, h: 320 },
  projects:   { w: 440, h: 360 },
  contact:    { w: 420, h: 320 },
};

export const getDefaultPosition = (index: number) => ({
  x: 120 + index * 40,
  y: 60 + index * 35,
});
