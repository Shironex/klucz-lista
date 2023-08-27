import { getUserSession } from "@/lib/auth";
import db from "@/lib/db/db";
import { projects, usersProjects } from "@/lib/db/schema/project-schema";
import { CreateProjectSchema } from "@/lib/validations/project";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getUserSession();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const userProjects = await db.query.usersProjects.findMany({
    where: eq(usersProjects.userId, session.user.id),
    with: {
      project: {
        columns: {
          id: true,
          name: true,
        }
      },
    }
  });

  if (userProjects.length === 0) {
    return NextResponse.json([], { status: 404 });
  }

  const data = userProjects.map((userProject) => userProject.project)
  
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    console.log(session);
    const body = await req.json();

    const data = CreateProjectSchema.parse(body);

    const projectExists = await db
      .select()
      .from(projects)
      .where(eq(projects.name, data.name));

    if (projectExists.length > 0) {
      return NextResponse.json(
        { message: "project with that name already exists" },
        { status: 400 }
      );
    }

    //TODO Properly Error handling and rollback if one of the queries fails / retry
    const projectId = uuidv4();

    await db.transaction(async (tx) => {
      await tx.insert(projects).values({
        id: projectId,
        name: data.name,
      });
      await tx.insert(usersProjects).values({
        projectId,
        userId: session.user.id,
      });
    });

    return NextResponse.json({ id: projectId, message: "ok" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "there was an error, try again later" },
      { status: 500 }
    );
  }
}
