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
              <TabsList className="rounded-none bg-transparent">
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
              </TabsList>
              <TabsContent value="all">
                <div className="mt-4 flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      Sofia Davis
                    </p>
                    <p className="text-sm text-muted-foreground">
                      m@example.com
                    </p>
                  </div>
                </div>
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
