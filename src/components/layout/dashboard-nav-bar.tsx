"use client";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import UserDropdown from "../user-dropdown";
import { UserNotifications } from "../user-notifications";
import { Icons } from "../icons";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useProjectStore from "@/lib/store/project-store";
import { Badge } from "../ui/badge";
import { set } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const DashboardNavBar = () => {
  const [project, currentProject, getProjects, setCurrentProject, projectId] =
    useProjectStore((state) => [
      state.projects,
      state.currentProject,
      state.getProjects,
      state.setCurrentProject,
      state.projectId,
    ]);
  const [hovered, setHovered] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      const projects = await getProjects();
      if (projects.length > 0 && projectId) {
        setHovered(new Array(projects.length).fill(false));
        for (const project of projects) {
          if (project.id === projectId) {
            setCurrentProject(project);
            return;
          }
        }
      }
    };
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="bg-background w-full flex justify-between mx-auto p-4 border-b-2 border-b-backgroundNav">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="bg-primary p-3 text-white rounded-md">
            <Icons.leftList className="w-5 h-5 cursor-pointer" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-5 mt-2 py-2">
          {project &&
            project.map((project, index) => (
              <DropdownMenuItem
                key={project.id}
                className="w-56 py-2 flex items-center justify-between cursor-pointer"
                onClick={() => setCurrentProject(project)}
                onMouseEnter={() =>
                  setHovered((hovered) => {
                    const newHovered = [...hovered];
                    newHovered[index] = true;
                    return newHovered;
                  })
                }
                onMouseLeave={() =>
                  setHovered((hovered) => {
                    const newHovered = [...hovered];
                    newHovered[index] = false;
                    return newHovered;
                  })
                }
              >
                <div className="flex items-center gap-1 flex-1">
                  <Icons.dotsList className="text-gray-500 w-4 h-4" />
                  <Avatar className="w-7 h-7 mx-2">
                    <AvatarImage
                      src="https://github.com/shadcn2.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback className="bg-primary text-xs w-full flex items-center justify-center">
                      {project.name.split(" ")[0].charAt(0).toUpperCase()}
                      {project.name.split(" ")[1]?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <span className="ml-1 font-bold text-white text-xs">
                    {project.name}
                  </span>
                </div>
                {currentProject?.id === project.id && !hovered[index] ? (
                  <Badge className="h-5 text-xs w-14">Active</Badge>
                ) : hovered[index] ? (
                  <div className="flex items-center justify-center rounded-full bg-primary w-4 h-4">
                    <Icons.chevronRight className="w-4 h-3 text-black dark:text-white" />
                  </div>
                ) : (
                  <Badge variant="secondary" className="h-5 text-xs w-14">
                    Inactive
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {currentProject ? (
        <div className="ml-4 h-6 flex flex-col gap-1">
          <div className="flex items-center">
            <span className="text-base font-bold">
              {currentProject && currentProject.name}
            </span>
            <Icons.Info className="mt-0.5 ml-2 h-3.5" />
            <Icons.favorite className="mt-0.5 h-4" />
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-sm bg-green-600 w-3 h-3" />
            <span className="text-xs text-gray-500">On Track</span>
          </div>
        </div>
      ) : null}

      <div className="ml-auto flex gap-2">
        <div className="flex items-center gap-5 mx-auto">
          <TeamMembers members={["1", "5", "3", "4", "6"]} />
          <Button
            variant="outline"
            className="flex items-center justify-center gap-1"
          >
            <Icons.share className="w-4 h-4" /> Share
          </Button>
          <Input placeholder="Search" className="flex items-center gap-1" />
        </div>
        <ThemeToggle />
        <UserNotifications />
        <UserDropdown />
      </div>
    </nav>
  );
};

const ProjectTeamMembers = () => {
  return (
    <div className="flex items-center">
      <Avatar className="w-7 h-7">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="w-7 h-7">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="2 w-7 h-7">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="w-7 h-7">
        <AvatarImage src="" />
        <AvatarFallback className="bg-primary text-xs w-full flex items-center justify-center">
          +11
        </AvatarFallback>      </Avatar>
    </div>
  );
};

interface TeamMembersProps {
  members: string[];
}

const TeamMembers: React.FC<TeamMembersProps> = ({ members }) => {
  const MAX_AVATARS = 4;
  const remainingMembers = members.slice(MAX_AVATARS);
  const numRemainingMembers = remainingMembers.length;
  const shouldRenderSingleAvatar = numRemainingMembers > 0;

  return (
    <div className="w-28 h-7 flex items-center flex-shrink-0 relative">
      {members.slice(0, MAX_AVATARS).map((member, index) => (
        <Avatar
          key={index}
          className={`w-7 h-7 absolute`}
          style={{ left: `${index * 1.1}rem`, zIndex: members.length + index }}
        >
          <AvatarImage src={`https://github.com/${member}.png`} />
          <AvatarFallback>{member.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
      {shouldRenderSingleAvatar && (
        <Avatar
          className={`w-7 h-7 absolute`}
          style={{ left: `${MAX_AVATARS * 1.1}rem`, zIndex: members.length + MAX_AVATARS }}
        >
          <AvatarImage src={``} />
          <AvatarFallback className="bg-primary text-xs w-full flex items-center justify-center">
            {`+${numRemainingMembers}`}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default DashboardNavBar;
