"use client";
import React from "react";
import Board from "@/components/board/board";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

type ActiveTab =
  | "Overview"
  | "List"
  | "Board"
  | "Timeline"
  | "Calendar"
  | "Dashboard"
  | "More";

const DashboardBoardPage = () => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("Board");
  const TabsItemList: ActiveTab[] = [
    "Overview",
    "List",
    "Board",
    "Timeline",
    "Calendar",
    "Dashboard",
    "More",
  ];

  return (
    <div className="h-full p-4 flex flex-col gap-3">
      <div className="flex items-center">
        <Tabs
          defaultValue="all"
          value={activeTab}
          className="w-full"
          onValueChange={(e: unknown) => setActiveTab(e as ActiveTab)}
        >
          <TabsList className="flex justify-start h-12 py-0">
            {TabsItemList.map((tab: ActiveTab) => {
              return (
                <TabsTrigger
                  key={tab}
                  className={`h-full w-20 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none`}
                  value={tab}
                >
                  {tab}
                </TabsTrigger>
              );
            })}
            <Button size="sm" className="ml-auto mr-1 flex items-center gap-1">
              <Icons.add className="w-5 h-5" />
              Add Charts
            </Button>
          </TabsList>
          <TabsContent value="all"></TabsContent>
          <TabsContent value="following">
            Change your password here.
          </TabsContent>
          <TabsContent value="archive">Change your password here.</TabsContent>
        </Tabs>
      </div>
      <Board />
    </div>
  );
};

export default DashboardBoardPage;
