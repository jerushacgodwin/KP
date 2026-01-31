
INSERT INTO `app_metas` (`id`, `meta_key`, `meta_value`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(2, 'academic_year', '1', '2025-02-01 06:12:18', '2025-02-01 06:12:18', NULL, 1, 0, NULL),
(3, 'frontend_website', '1', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(4, 'language', 'en', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(5, 'disable_language', '1', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(6, 'institute_type', '1', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(7, 'shift_data', '{\"Morning\":{\"start\":\"08:00 am\",\"end\":\"01:00 pm\"},\"Day\":{\"start\":\"02:00 pm\",\"end\":\"07:00 pm\"},\"Evening\":{\"start\":\"12:00 am\",\"end\":\"12:00 am\"}}', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(8, 'weekends', '[5]', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(9, 'week_start_day', '6', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(10, 'week_end_day', '5', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(11, 'total_casual_leave', '14', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(12, 'total_sick_leave', '10', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(13, 'total_maternity_leave', '90', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(14, 'total_special_leave', '5', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(15, 'board_name', 'Dhaka', '2025-02-01 06:12:18', NULL, NULL, 1, NULL, NULL),
(16, 'result_default_grade_id', '1', '2025-02-01 06:12:19', NULL, NULL, 1, NULL, NULL),
(17, 'institute_settings', '{\"logo\":\"transparent_image.png\",\"school_name\":\"Knowledge Pitch\",\"address\":\"Opposite to VVHS school, Paloothara junction, Mavelikara, \\r\\nKerala-690505 \"}', '2025-08-04 17:41:16', '2025-08-04 17:41:16', NULL, 1, 1, NULL);

INSERT INTO `months` (`MonthNo`, `MonthName`) VALUES
(1, 'January'),
(2, 'Febrary'),
(3, 'March'),
(4, 'April'),
(5, 'May'),
(6, 'June'),
(7, 'July'),
(8, 'Auguest'),
(9, 'Spetember'),
(10, 'October'),
(11, 'November'),
(12, 'December');

INSERT INTO `permissions` (`id`, `slug`, `name`, `group`, `group_id`, `menuoder`, `icon`, `created_at`) VALUES
(10, '/profile', 'Profile Access', 'admin', 1, 0, 'Profile Access', '2025-05-28 14:45:21'),
(11, '/profile', 'Profile Access', 'teacher', 2, 0, 'Profile Access', '2025-05-28 14:45:21'),
(12, '/profile', 'Profile Access', 'student', 3, 0, 'Profile Access', '2025-05-28 14:45:21'),
(13, '/profile', 'Profile Access', 'parent', 4, 0, 'Profile Access', '2025-05-28 14:45:21'),
(14, '/settings', 'Settings Access', 'admin', 1, 0, 'Settings', '2025-05-28 14:45:21'),
(15, '/settings', 'Settings Access', 'teacher', 2, 0, 'Settings', '2025-05-28 14:45:21'),
(16, '/settings', 'Settings Access', 'student', 3, 0, 'Settings', '2025-05-28 14:45:21'),
(17, '/settings', 'Settings Access', 'parent', 4, 0, 'Settings', '2025-05-28 14:45:21'),
(18, '/logout', 'Logout Access', 'admin', 1, 0, 'logout', '2025-05-28 14:45:21'),
(19, '/logout', 'Logout Access', 'teacher', 2, 0, 'logout', '2025-05-28 14:45:21'),
(20, '/logout', 'Logout Access', 'student', 3, 0, 'logout', '2025-05-28 14:45:21'),
(21, '/logout', 'Logout Access', 'parent', 4, 0, 'logout', '2025-05-28 14:45:21'),
(219, '/teacher/attendance', 'Attendance', 'Class Teacher\r\n', 8, 0, 'Attendance', '2025-06-08 16:38:53'),
(220, '/teacher/attendance', 'Attendance', 'Teacher\r\n', 2, 0, 'Attendance', '2025-06-08 16:39:32'),
(221, '/teacher/attendance', 'Attendance', 'Admin\r\n', 1, 0, 'Attendance', '2025-06-08 16:40:16'),
(222, '/admission/staff', 'Add Staff', 'admin', 1, 10, 'add staff', '2025-06-15 10:42:48'),
(223, '/admission/student', 'Add Student', 'admin', 1, 11, 'student', '2025-06-15 10:43:34'),
(224, '/lessons/teacher', 'Add Lessons', 'admin', 1, 0, 'note', '2025-06-30 01:01:26'),
(225, '/lessons/teacher', 'Add Lessons', 'teacher', 2, 0, 'note', '2025-06-30 01:02:12'),
(226, '/lessons/teacher', 'Add Lessons', 'student', 3, 0, 'note', '2025-06-30 01:02:56'),
(227, '/lessons/teacher', 'Add Lessons', 'parent', 4, 0, 'note', '2025-06-30 01:03:39'),
(228, '/lessons/student', 'Lesson Nots', 'admin', 1, 0, 'Lesson Nots', '2025-07-07 01:34:39'),
(229, '/lessons/student', 'Lesson Nots', 'teacher', 2, 0, 'Lesson Nots', '2025-07-07 01:35:21'),
(230, '/lessons/student', 'Lesson Nots', 'student', 3, 0, 'Lesson Nots', '2025-07-07 01:36:01'),
(231, '/lessons/student', 'Lesson Nots', 'parent', 4, 0, 'Lesson Nots', '2025-07-07 01:36:32'),
(232, '/billing', 'Fess Entry', 'admin', 1, 0, 'payfees', '2025-08-16 14:52:26');

INSERT INTO `roles` (`id`, `name`, `deletable`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'Admin', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(2, 'Teacher', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(3, 'Student', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(4, 'Parents', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(5, 'Accountant', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(6, 'Librarian', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(7, 'Receptionist', 0, '2025-02-01 06:12:06', '2025-02-01 06:12:06', NULL, 0, 0, NULL),
(8, 'Class Teacher', 1, '2025-06-08 16:33:20', '2025-06-08 16:33:20', NULL, 1, 1, NULL);

INSERT INTO `sequences` (`name`, `current_value`) VALUES
('class_id', 0),
('user_id', 0);

INSERT INTO `site_metas` (`id`, `meta_key`, `meta_value`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'settings', '{\"logo\":\"logo.png\",\"logo2x\":\"logo@2x.png\",\"favicon\":\"favicon.png\",\"name\":\"Cloud School\",\"short_name\":\"CloudSchool\",\"facebook\":\"#\",\"instagram\":\"#\",\"twitter\":\"#\",\"youtube\":\"#\"}', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(2, 'timeline', '{\"t\":\"We Start Here\",\"d\":\"Lorem ipsum\",\"y\":\"2006\"}', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(3, 'timeline', '{\"t\":\"Top Score\",\"d\":\"We achive top result score in the state\",\"y\":\"2010\"}', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(4, 'faq', '{\"q\":\"How to apply for adminission?\",\"a\":\"Just e-mail us, or contact on hot line.\"}', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(5, 'contact_address', 'Dhaka-1207', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(6, 'contact_phone', '+880258685', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(7, 'contact_email', 'contact@cloudschoolbd.com', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(8, 'contact_latlong', '23.7340076,90.3841824', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(9, 'gallery', '1.jpg', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(10, 'gallery', '2.jpg', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(11, 'gallery', '3.jpg', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(12, 'statistic', '4000,150,18000,9800', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL),
(13, 'our_service_text', 'Lorem ipsum', '2025-02-01 06:12:12', '2025-02-01 06:12:12', NULL, 0, 0, NULL);

INSERT INTO `stafftype` (`InstituteId`, `StaffTypeId`, `StaffType`, `StaffDes`) VALUES
(1, 1, 'Principal', NULL),
(1, 2, 'Teacher', NULL),
(1, 3, 'Officeboy', NULL),
(1, 4, 'Attender', NULL),
(2, 5, 'Principal', NULL),
(2, 6, 'Teacher', NULL),
(2, 7, 'Clerk', NULL),
(2, 8, 'attender', '');

ALTER TABLE `about_contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `about_contents_created_by_index` (`created_by`),
  ADD KEY `about_contents_updated_by_index` (`updated_by`),
  ADD KEY `about_contents_deleted_by_index` (`deleted_by`);

ALTER TABLE `about_sliders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `about_sliders_created_by_index` (`created_by`),
  ADD KEY `about_sliders_updated_by_index` (`updated_by`),
  ADD KEY `about_sliders_deleted_by_index` (`deleted_by`);

ALTER TABLE `academic_years`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_id` (`school_id`),
  ADD KEY `academic_years_created_by_index` (`created_by`),
  ADD KEY `academic_years_updated_by_index` (`updated_by`),
  ADD KEY `academic_years_deleted_by_index` (`deleted_by`),
  ADD KEY `school_id_2` (`school_id`);

ALTER TABLE `app_metas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `app_metas_created_by_index` (`created_by`),
  ADD KEY `app_metas_updated_by_index` (`updated_by`),
  ADD KEY `app_metas_deleted_by_index` (`deleted_by`);

ALTER TABLE `book`
  ADD PRIMARY KEY (`BookId`);

ALTER TABLE `bookcategory`
  ADD PRIMARY KEY (`BookCategoryId`);

ALTER TABLE `bookcode`
  ADD PRIMARY KEY (`BookCodeId`);

ALTER TABLE `buses`
  ADD PRIMARY KEY (`s_no`);

ALTER TABLE `bus_root`
  ADD PRIMARY KEY (`s_no`);

ALTER TABLE `bus_staff`
  ADD PRIMARY KEY (`s_no`);

ALTER TABLE `castcategory`
  ADD PRIMARY KEY (`CastCategoryId`);

ALTER TABLE `class_sequences`
  ADD PRIMARY KEY (`name`);

ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `employees_role_id_foreign` (`role_id`),
  ADD KEY `employees_updated_by_index` (`updated_by`),
  ADD KEY `employees_deleted_by_index` (`deleted_by`),
  ADD KEY `employees_created_by_index` (`created_by`) USING BTREE,
  ADD KEY `fk_employees_school_code` (`school_id`);

ALTER TABLE `employee_attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_attendances_employee_id_foreign` (`employee_id`),
  ADD KEY `employee_attendances_created_by_index` (`created_by`),
  ADD KEY `employee_attendances_updated_by_index` (`updated_by`),
  ADD KEY `employee_attendances_deleted_by_index` (`deleted_by`);

ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `events_created_by_index` (`created_by`),
  ADD KEY `fk_class_events` (`class_id`);

ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exams_created_by_index` (`created_by`),
  ADD KEY `exams_updated_by_index` (`updated_by`),
  ADD KEY `exams_deleted_by_index` (`deleted_by`);

ALTER TABLE `exam_rules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_rules_class_id_foreign` (`class_id`),
  ADD KEY `exam_rules_subject_id_foreign` (`subject_id`),
  ADD KEY `exam_rules_grade_id_foreign` (`grade_id`),
  ADD KEY `exam_rules_combine_subject_id_foreign` (`combine_subject_id`),
  ADD KEY `exam_rules_created_by_index` (`created_by`),
  ADD KEY `exam_rules_updated_by_index` (`updated_by`),
  ADD KEY `exam_rules_deleted_by_index` (`deleted_by`);

ALTER TABLE `fee_structure`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_fee_structure` (`school_id`,`class_group`,`academic_year`,`fee_type`);

ALTER TABLE `fee_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grades_created_by_index` (`created_by`),
  ADD KEY `grades_updated_by_index` (`updated_by`),
  ADD KEY `grades_deleted_by_index` (`deleted_by`);

ALTER TABLE `hostelfees`
  ADD PRIMARY KEY (`HostelFeeId`);

ALTER TABLE `hostelrecord`
  ADD PRIMARY KEY (`HostelRecordId`);

ALTER TABLE `i_classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `class_id` (`class_id`),
  ADD KEY `fk_class_teacher` (`class_teacher`),
  ADD KEY `fk_class_leader` (`class_leader`),
  ADD KEY `fk_i_classes_class` (`school_id`);

ALTER TABLE `leaves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leaves_employee_id_foreign` (`employee_id`),
  ADD KEY `leaves_created_by_index` (`created_by`),
  ADD KEY `leaves_updated_by_index` (`updated_by`),
  ADD KEY `leaves_deleted_by_index` (`deleted_by`);

ALTER TABLE `lesson_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_lesson_class` (`class_id`),
  ADD KEY `fk_lesson_teacher` (`teacher_id`),
  ADD KEY `fk_lesson_subject` (`subject_id`);

ALTER TABLE `libraryreg`
  ADD PRIMARY KEY (`LibraryId`);

ALTER TABLE `marks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `marks_class_id_exam_id_registration_id_subject_id_unique` (`class_id`,`exam_id`,`registration_id`,`subject_id`),
  ADD KEY `marks_academic_year_id_foreign` (`academic_year_id`),
  ADD KEY `marks_section_id_foreign` (`section_id`),
  ADD KEY `marks_registration_id_foreign` (`registration_id`),
  ADD KEY `marks_exam_id_foreign` (`exam_id`),
  ADD KEY `marks_subject_id_foreign` (`subject_id`),
  ADD KEY `marks_created_by_index` (`created_by`),
  ADD KEY `marks_updated_by_index` (`updated_by`),
  ADD KEY `marks_deleted_by_index` (`deleted_by`);

ALTER TABLE `months`
  ADD PRIMARY KEY (`MonthNo`);

ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_permissions_role` (`group_id`);

ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `results_academic_year_id_foreign` (`academic_year_id`),
  ADD KEY `results_class_id_foreign` (`class_id`),
  ADD KEY `results_registration_id_foreign` (`registration_id`),
  ADD KEY `results_exam_id_foreign` (`exam_id`),
  ADD KEY `results_created_by_index` (`created_by`),
  ADD KEY `results_updated_by_index` (`updated_by`),
  ADD KEY `results_deleted_by_index` (`deleted_by`);

ALTER TABLE `result_publish`
  ADD PRIMARY KEY (`id`),
  ADD KEY `result_publish_academic_year_id_foreign` (`academic_year_id`),
  ADD KEY `result_publish_class_id_foreign` (`class_id`),
  ADD KEY `result_publish_exam_id_foreign` (`exam_id`);

ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`),
  ADD KEY `roles_created_by_index` (`created_by`),
  ADD KEY `roles_updated_by_index` (`updated_by`),
  ADD KEY `roles_deleted_by_index` (`deleted_by`);

ALTER TABLE `roles_permissions`
  ADD KEY `roles_permissions_role_id_foreign` (`role_id`),
  ADD KEY `roles_permissions_permission_id_foreign` (`permission_id`),
  ADD KEY `roles_permissions_created_by_index` (`created_by`),
  ADD KEY `roles_permissions_updated_by_index` (`updated_by`),
  ADD KEY `roles_permissions_deleted_by_index` (`deleted_by`);

ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

ALTER TABLE `school_fees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD UNIQUE KEY `user_id` (`student_id`),
  ADD KEY `fk_school_fees_code` (`school_id`),
  ADD KEY `fk_school_fees_i_classes` (`class_id`);

ALTER TABLE `school_finances`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bill_id` (`bill_id`),
  ADD KEY `fk_school_finance_student_user` (`student_id`),
  ADD KEY `fk_school_finance_staff_user` (`staff_id`);

ALTER TABLE `sequences`
  ADD PRIMARY KEY (`name`);

ALTER TABLE `site_metas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `site_metas_created_by_index` (`created_by`),
  ADD KEY `site_metas_updated_by_index` (`updated_by`),
  ADD KEY `site_metas_deleted_by_index` (`deleted_by`);

ALTER TABLE `stafftype`
  ADD PRIMARY KEY (`StaffTypeId`);

ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`),
  ADD UNIQUE KEY `user_id_3` (`user_id`),
  ADD KEY `students_created_by_index` (`created_by`),
  ADD KEY `students_updated_by_index` (`updated_by`),
  ADD KEY `students_deleted_by_index` (`deleted_by`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `fk_student_class` (`class_id`),
  ADD KEY `fk_students_school_code` (`school_id`);

ALTER TABLE `student_attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_attendances_academic_year_id_foreign` (`academic_year_id`),
  ADD KEY `student_attendances_class_id_foreign` (`class_id`),
  ADD KEY `student_attendances_created_by_index` (`created_by`),
  ADD KEY `student_attendances_updated_by_index` (`updated_by`),
  ADD KEY `student_attendances_deleted_by_index` (`deleted_by`),
  ADD KEY `fk_student_attendances` (`registration_id`);

ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subjects_created_by_index` (`created_by`),
  ADD KEY `subjects_updated_by_index` (`updated_by`),
  ADD KEY `subjects_deleted_by_index` (`deleted_by`);

ALTER TABLE `teacher_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_profiles_created_by_index` (`created_by`),
  ADD KEY `teacher_profiles_updated_by_index` (`updated_by`),
  ADD KEY `teacher_profiles_deleted_by_index` (`deleted_by`);

ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `testimonials_created_by_index` (`created_by`),
  ADD KEY `testimonials_updated_by_index` (`updated_by`),
  ADD KEY `testimonials_deleted_by_index` (`deleted_by`);

ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_class_id` (`class_id`),
  ADD KEY `fk_employ_timetable` (`staff_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_created_by_index` (`created_by`),
  ADD KEY `users_updated_by_index` (`updated_by`),
  ADD KEY `users_deleted_by_index` (`deleted_by`),
  ADD KEY `fk_users_school_code` (`school_id`);

ALTER TABLE `users_permissions`
  ADD KEY `users_permissions_user_id_foreign` (`user_id`),
  ADD KEY `users_permissions_permission_id_foreign` (`permission_id`),
  ADD KEY `users_permissions_created_by_index` (`created_by`),
  ADD KEY `users_permissions_updated_by_index` (`updated_by`),
  ADD KEY `users_permissions_deleted_by_index` (`deleted_by`);

ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `user_roles_role_id_foreign` (`role_id`),
  ADD KEY `user_roles_created_by_index` (`created_by`),
  ADD KEY `user_roles_updated_by_index` (`updated_by`),
  ADD KEY `user_roles_deleted_by_index` (`deleted_by`);

INSERT INTO `schools` (`code`, `name`, `address`) SELECT 'SCH001', 'Knowledge Pitch', 'Default Address' WHERE NOT EXISTS (SELECT * FROM `schools` WHERE `code` = 'SCH001');

INSERT INTO `users` (`school_id`, `name`, `username`, `email`, `password`, `status`, `created_at`, `updated_at`) 
SELECT 'SCH001', 'Admin User', 'admin', 'admin@knowledgepitch.com', '$2a$10$sTXwqvRYZ55zl4w04piCLr8z69.JT.1m0CiDGnWUsLNmK1LL', '1', NOW(), NOW()
WHERE NOT EXISTS (SELECT * FROM `users` WHERE `username` = 'admin');

INSERT INTO `user_roles` (`user_id`, `role_id`, `created_at`, `updated_at`)
SELECT `id`, 1, NOW(), NOW() FROM `users` WHERE `username` = 'admin'
AND NOT EXISTS (SELECT * FROM `user_roles` WHERE `user_id` = (SELECT `id` FROM `users` WHERE `username` = 'admin') AND `role_id` = 1);
