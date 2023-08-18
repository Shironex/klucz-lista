"use client";
import * as React from "react";
import { Icons } from "./icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReadonlyProps } from "@/types/types-utils";

//TODO - add notifications system
//TODO - add notifications Props
//TODO - add notifications state

type ActiveTab = "all" | "following" | "archive";

export function UserNotifications() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("all");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" variant="outline" size="icon">
          <Icons.notifications className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" asChild>
        <Card className="min-w-[350px]">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center justify-between text-lg">
              Notifications{" "}
              <span className="cursor-pointer text-sm text-muted-foreground">
                Mark all as read
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 px-3 pb-3">
            <Tabs
              defaultValue="all"
              className="w-[400px]"
              value={activeTab}
              onValueChange={(e) => setActiveTab(e as ActiveTab)}
            >
              <TabsList className="rounded-none bg-transparent w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none flex gap-3 items-center"
                  value="all"
                >
                  All
                  <span
                    className={cn(
                      "text-xs text-white rounded-[4px] px-2.5 py-0.5",
                      activeTab === "all"
                        ? "bg-primary"
                        : "bg-transparent text-black dark:text-white"
                    )}
                  >
                    8
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none flex gap-3 items-center"
                  value="following"
                >
                  Following
                  <span
                    className={cn(
                      "text-xs text-white rounded-[4px] px-2.5 py-0.5",
                      activeTab === "following"
                        ? "bg-primary"
                        : "bg-transparent text-black dark:text-white"
                    )}
                  >
                    6
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none flex gap-3 items-center"
                  value="archive"
                >
                  Archive
                </TabsTrigger>

                <Icons.settings className="cursor-pointer mt-1 ml-auto self-center w-[18px] h-[18px]" />
              </TabsList>
              <TabsContent value="all">
                <NotificationMessagee
                  title="joined to 🎁 Final Presentation"
                  username="Sofia Davis"
                  time="2h"
                  project="Social Media Plan"
                  type="joined"
                />
                <NotificationMessagee
                  title="mention you in 😍 Tennis List"
                  username="Jess Radon"
                  time="4h"
                  project="Hobby List"
                  type="mention"
                />
                <NotificationMessagee
                  title="is requesting to upgrade Plan"
                  username="Sandra Marx"
                  time="12h"
                  project="Hobby List"
                  type="request"
                />
                <NotificationMessagee
                  title="upload a file"
                  username="Adam Smith"
                  time="1d"
                  project="Hobby List"
                  type="upload"
                  filename="landing_page_ver2.fig"
                  filesize="1.2MB"
                />
              </TabsContent>
              <TabsContent value="following">
                Change your password here.
              </TabsContent>
              <TabsContent value="archive">
                Change your password here.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

//TODO - Typeguard for upload type
//TODO - File icons for upload type
interface NotificationMessageeProps {
  title: string;
  username: string;
  time: string;
  project: string;
  type: "mention" | "joined" | "request" | "upload";
  filename?: string;
  filesize?: string;
}

const NotificationMessagee = (props: ReadonlyProps<NotificationMessageeProps>) => {
  const [firstName, lastName] = props.username.split(" ");
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  // const isUploadType = (type: NotificationMessageeProps["type"]): type is "upload" => {
  //   return type === "upload";
  // };

  return (
    <div className="mt-4 flex items-start space-x-4">
      <Avatar className="rounded-sm">
        <AvatarImage className="rounded-sm" src="/avatars/01.png" />
        <AvatarFallback className="rounded-sm">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium leading-none">
          {props.username} {props.title}
        </p>
        <p className="text-sm text-muted-foreground">
          {props.time} ago <span className="space-x-2 text-[10px]">○</span>{" "}
          {props.project}
        </p>
        {props.type === "request" && (
          <div className="mt-1 flex space-x-2">
            <Button variant="default" size="xs">
              Accept
            </Button>
            <Button variant="secondary" size="xs">
              Decline
            </Button>
          </div>
        )}
        {props.type === "upload" && (
          <p className="mt-2 text-sm flex gap-2 items-center">
            <span
              className={"rounded-[4px] w-5 h-5 px-1 py-0.5 dark:bg-white bg-black"}
            >
              <Image src="/icons/figma.png" alt="file icon" width={10} height={10} />
            </span>{" "}
            {props.filename}{" "}
            <span className="text-muted-foreground">{props.filesize}</span>
          </p>
        )}
      </div>
    </div>
  );
};
