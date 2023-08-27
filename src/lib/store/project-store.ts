import { create } from "zustand";
import { api, handleFetchError } from "../api";

interface Project {
  id: string;
  name: string;
  image?: string;
}

interface ProjectStore {
  projects: Project[] | null;
  projectId: string | null;
  currentProject: Project | null;
  getProjects: () => Promise<Project[]>;
  setCurrentProject: (project: Project) => void;
  setProjectId: (projectid: string) => void;
}

const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: null,
  currentProject: null,
  projectId: null,
  setProjectId: (projectId) => set({ projectId }),
  getProjects: async () => {
    try {
      const response = await api.get<Project[] | []>("/project");
      if (response.status === 200) {
        set({ projects: response.data });
        return response.data;
      }
    } catch (error) {
      handleFetchError(error);
      return [];
    }
    return [];
  },
  setCurrentProject: (project) => set({ currentProject: project }),
}));

export default useProjectStore;
