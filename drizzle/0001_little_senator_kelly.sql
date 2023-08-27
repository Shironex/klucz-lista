CREATE TABLE `project` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	CONSTRAINT `project_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_projects` (
	`user_id` varchar(255) NOT NULL,
	`project_id` varchar(255) NOT NULL,
	CONSTRAINT `users_projects_project_id_user_id` PRIMARY KEY(`project_id`,`user_id`)
);
--> statement-breakpoint
ALTER TABLE `users_projects` ADD CONSTRAINT `users_projects_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_projects` ADD CONSTRAINT `users_projects_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE no action ON UPDATE no action;