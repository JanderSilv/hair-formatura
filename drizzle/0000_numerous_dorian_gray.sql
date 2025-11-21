CREATE TABLE `golden_book_entries` (
	`approved` integer DEFAULT false NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	`email` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`message` text NOT NULL,
	`name` text NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `golden_book_entries_email_unique` ON `golden_book_entries` (`email`);