import { create } from 'zustand';

/**
 * Navigation Store
 * Manages global UI state for navigation and shell elements.
 */
const useNavigationStore = create((set, get) => ({
  activeRoute: '/',
  breadcrumbs: [],
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  lastVisitedRoute: null,

  setActiveRoute: (route) => set({ activeRoute: route }),
  
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  setBreadcrumbs: (crumbs) => set({ breadcrumbs: crumbs }),

  /**
   * Automatically generate breadcrumbs from route metadata (logic to be expanded)
   */
  generateBreadcrumbs: (pathname) => {
    const segments = pathname.split('/').filter(Boolean);
    const crumbs = segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path
      };
    });
    set({ breadcrumbs: crumbs });
  }
}));

export default useNavigationStore;
