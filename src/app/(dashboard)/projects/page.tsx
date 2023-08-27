"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CreateProjectForm from "@/components/form/create-project";
import { api, handleFetchError } from "@/lib/api";
import Link from "next/link";
import useProjectStore from "@/lib/store/project-store";

interface apiProjectResponse {
  id: string;
  name: string;
}

const ProjectsPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<apiProjectResponse[]>([]);
  const setProjectId = useProjectStore((state) => state.setProjectId);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get<apiProjectResponse[]>("/project");
        if (res.status === 200) {
          console.log(res.data);
          setProjects(res.data);
        }
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-3xl mb-5 text-black dark:text-white">
        Select Project
      </h1>
      <div className="flex flex-wrap gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} id={project.id} name={project.name} setProjectId={setProjectId} />
        ))}
      </div>
      <div className="mt-3 flex flex-col gap-2 items-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon">
              <Icons.add />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create new project</AlertDialogTitle>
              <AlertDialogDescription>
                This will create a new project and add it to your workspace.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <CreateProjectForm />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

type ProjectCardProps = apiProjectResponse & {
  setProjectId: (id: string) => void;
};

const ProjectCard = ({ id, name, setProjectId }: ProjectCardProps) => {
  return (
    <Link href={`/dashboard/board`} onClick={() => setProjectId(id)} className="cursor-pointer flex flex-col items-center justify-center w-40 h-24 rounded-sm bg-primary hover:bg-primary/90">
      {name}
    </Link>
  );
};

export default ProjectsPage;
