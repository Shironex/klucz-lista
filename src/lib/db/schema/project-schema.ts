import { relations } from "drizzle-orm";
import { mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";
import { users } from "./user-schema";
import { createSelectSchema } from 'drizzle-zod';

export const usersRelations = relations(users, ({ many }) => ({
  usersProjects: many(usersProjects),
}));

export const projects = mysqlTable("project", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
});

export const groupsRelations = relations(projects, ({ many }) => ({
  usersProjects: many(usersProjects),
}));

export const usersProjects = mysqlTable(
  "users_projects",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    projectId: varchar("project_id", { length: 255 })
      .notNull()
      .references(() => projects.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.projectId),
  })
);

export const usersToProjectsRelations = relations(usersProjects, ({ one }) => ({
  project: one(projects, {
    fields: [usersProjects.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [usersProjects.userId],
    references: [users.id],
  }),
}));

export const apiProjectResponse = createSelectSchema(projects).pick({ name: true, id: true});