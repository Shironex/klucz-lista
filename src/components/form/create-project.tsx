import React, { useState } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  CreateProjectSchemaType,
  CreateProjectSchema,
} from "@/lib/validations/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { DefaultErrorResponse, api } from "@/lib/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import useProjectStore from "@/lib/store/project-store";

interface ApiResponse {
  id: string;
  message: string;
}

const CreateProjectForm = () => {
  const router = useRouter();
  const form = useForm<CreateProjectSchemaType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateProjectSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const setProjectId = useProjectStore((state) => state.setProjectId);

  async function onSubmit(data: CreateProjectSchemaType) {
    setIsLoading(true);
    try {
      const response = await api.post<ApiResponse>("/project", data);
      if (response.status === 201) {
        setProjectId(response.data.id);
        router.push(`/dashboard/board`);
        toast({
          title: "Project created",
          description: "Your project has been created successfully",
        });
      }
    } catch (error) {
      if (axios.isAxiosError<DefaultErrorResponse>(error)) {
        toast({
          title: "There was an error",
          description: error.response?.data.message || "Something went wrong",
        });
      } else
      {
        console.log(error);
        toast({
          title: "There was an error",
          description: "Something went wrong",
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Project name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="My new business project"
                    type="text"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-2" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
