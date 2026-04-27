import { create } from 'zustand';

export type AppId = 'terminal' | 'about' | 'portfolio' | 'neural' | 'contact' | 'logiwa';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface OSStore {
  windows: Record<AppId, WindowState>;
  activeWindow: AppId | null;
  bootSequenceComplete: boolean;
  openApp: (id: AppId, title?: string) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  setBootSequenceComplete: (complete: boolean) => void;
}

const initialState: Record<AppId, WindowState> = {
  terminal: { id: 'terminal', title: 'VyOS Terminal', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10 },
  about: { id: 'about', title: 'System Specs', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  portfolio: { id: 'portfolio', title: 'Active Processes', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  neural: { id: 'neural', title: 'Neural Engine', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  contact: { id: 'contact', title: 'Comm Link', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  logiwa: { id: 'logiwa', title: 'Logiwa WMS', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
};

export const useOSStore = create<OSStore>((set, get) => ({
  windows: initialState,
  activeWindow: 'terminal',
  bootSequenceComplete: false,
  
  openApp: (id, title) => set((state) => {
    const highestZ = Math.max(...Object.values(state.windows).map(w => w.zIndex), 0);
    const win = state.windows[id];
    return {
      windows: {
        ...state.windows,
        [id]: { ...win, isOpen: true, isMinimized: false, title: title || win.title, zIndex: highestZ + 1 }
      },
      activeWindow: id
    };
  }),

  closeApp: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: false }
    },
    activeWindow: state.activeWindow === id ? null : state.activeWindow
  })),

  minimizeApp: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true }
    },
    activeWindow: state.activeWindow === id ? null : state.activeWindow
  })),

  maximizeApp: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
    }
  })),

  focusApp: (id) => set((state) => {
    if (state.activeWindow === id && !state.windows[id].isMinimized) return state;
    const highestZ = Math.max(...Object.values(state.windows).map(w => w.zIndex), 0);
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: false, zIndex: highestZ + 1 }
      },
      activeWindow: id
    };
  }),

  setBootSequenceComplete: (complete) => set({ bootSequenceComplete: complete })
}));
