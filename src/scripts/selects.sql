INSERT INTO Departments (department_id, dep_name, total, dep_fk) VALUES (1, 'Recruitment', 50000, NULL);
INSERT INTO Departments (department_id, dep_name, total, dep_fk) VALUES (2, 'musical group', 100000, (SELECT department_id FROM Departments WHERE dep_name = 'Recruitment'));
INSERT INTO Departments (department_id, dep_name, total, dep_fk) VALUES (3, 'Desarrollo', 20000, NULL);
INSERT INTO Jobs (job_id, job_name, salary, image) VALUES (1, 'JEFE', 30000, '');
INSERT INTO Jobs (job_id, job_name, salary, image) VALUES (2, 'Trainee', 10000, '');
INSERT INTO Jobs (job_id, job_name, salary, image) VALUES (3, 'Rapper', 59999, 'https://alternative-storage.s3.us-east-2.amazonaws.com/rapper.jpg');
INSERT INTO Jobs (job_id, job_name, salary, image) VALUES (4, 'Desarrollador backend', 4500, 'https://dev-to-uploads.s3.amazonaws.com/i/zki4ndggcept7aaxpo3w.jpg');
INSERT INTO Categories (category_id, category_name) VALUES (1, 'humano');
INSERT INTO Categories (category_id, category_name) VALUES (2, 'social');
INSERT INTO Categories (category_id, category_name) VALUES (3, 'dinero');
INSERT INTO Categories (category_id, category_name) VALUES (4, 'exito');
INSERT INTO Categories (category_id, category_name) VALUES (5, 'musica');
INSERT INTO Categories (category_id, category_name) VALUES (6, 'danza');
INSERT INTO Categories (category_id, category_name) VALUES (7, 'fama');
INSERT INTO Categories (category_id, category_name) VALUES (8, 'cool');
INSERT INTO Categories (category_id, category_name) VALUES (9, 'software');
INSERT INTO Categories (category_id, category_name) VALUES (10, 'developer');
INSERT INTO Categories (category_id, category_name) VALUES (11, 'java');
INSERT INTO Requirements (requirement_id, req_name, r_size, r_required) VALUES (1, 'Gusto musical', 25, 1);
INSERT INTO Requirements (requirement_id, req_name, r_size, r_required) VALUES (2, 'Pasaporte', 15, 0);
INSERT INTO Requirements (requirement_id, req_name, r_size, r_required) VALUES (3, 'Certificado en danza', 10, 1);
INSERT INTO Requirements (requirement_id, req_name, r_size, r_required) VALUES (4, 'Album de fotos', 45, 1);
INSERT INTO Requirements (requirement_id, req_name, r_size, r_required) VALUES (5, 'Certificado de lectura', 5, 0);
INSERT INTO Requirements (requirement_id, req_name, r_size, r_required) VALUES (6, 'Video de audicion, 4 versos a eleccion', 100, 1);
INSERT INTO Requirements (requirement_id, req_name, r_size, r_required) VALUES (7, 'Constancia de cursos aprobados con 200 creditos o mas', 10, 0);
INSERT INTO Formats (format_id, format_name) VALUES (1, 'mp3');
INSERT INTO Formats (format_id, format_name) VALUES (2, 'mp4');
INSERT INTO Formats (format_id, format_name) VALUES (3, 'mkv');
INSERT INTO Formats (format_id, format_name) VALUES (4, 'pdf');
INSERT INTO Formats (format_id, format_name) VALUES (5, 'png');
INSERT INTO Formats (format_id, format_name) VALUES (6, 'jpg');
INSERT INTO Formats (format_id, format_name) VALUES (7, 'jpeg');
INSERT INTO Formats (format_id, format_name) VALUES (8, 'wmv');
UPDATE Departments SET dep_fk = (SELECT department_id FROM Departments WHERE dep_name = 'Recruitment') WHERE department_id = 2;
INSERT INTO DepartmentJobs (department_fk, job_fk, job_dep_id) VALUES (
											(SELECT department_id FROM Departments WHERE dep_name = 'Recruitment'),
											(SELECT job_id FROM Jobs WHERE job_name = 'JEFE'), 1);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'humano'),
																(SELECT job_id FROM Jobs WHERE job_name = 'JEFE'),
																2
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'social'),
																(SELECT job_id FROM Jobs WHERE job_name = 'JEFE'),
																3
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'dinero'),
																(SELECT job_id FROM Jobs WHERE job_name = 'JEFE'),
																4
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'exito'),
																(SELECT job_id FROM Jobs WHERE job_name = 'JEFE'),
																5
															);
INSERT INTO JobRequirements (req_fk, job_fk, job_req_id) VALUES (
															(SELECT requirement_id FROM Requirements WHERE req_name = 'Gusto musical'),
															(SELECT job_id from Jobs WHERE job_name = 'JEFE'), 2);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'mp3'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Gusto musical'), 2);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'mp4'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Gusto musical'), 3);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'mkv'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Gusto musical'), 4);
INSERT INTO JobRequirements (req_fk, job_fk, job_req_id) VALUES (
															(SELECT requirement_id FROM Requirements WHERE req_name = 'Pasaporte'),
															(SELECT job_id from Jobs WHERE job_name = 'JEFE'), 3);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'pdf'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Pasaporte'), 5);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'png'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Pasaporte'), 6);
INSERT INTO DepartmentJobs (department_fk, job_fk, job_dep_id) VALUES (
											(SELECT department_id FROM Departments WHERE dep_name = 'Recruitment'),
											(SELECT job_id FROM Jobs WHERE job_name = 'Trainee'), 2);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'musica'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Trainee'),
																6
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'danza'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Trainee'),
																7
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'fama'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Trainee'),
																8
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'dinero'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Trainee'),
																9
															);
INSERT INTO JobRequirements (req_fk, job_fk, job_req_id) VALUES (
															(SELECT requirement_id FROM Requirements WHERE req_name = 'Certificado en danza'),
															(SELECT job_id from Jobs WHERE job_name = 'Trainee'), 4);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'pdf'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Certificado en danza'), 7);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'png'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Certificado en danza'), 8);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'jpg'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Certificado en danza'), 9);
INSERT INTO JobRequirements (req_fk, job_fk, job_req_id) VALUES (
															(SELECT requirement_id FROM Requirements WHERE req_name = 'Album de fotos'),
															(SELECT job_id from Jobs WHERE job_name = 'Trainee'), 5);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'png'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Album de fotos'), 10);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'jpg'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Album de fotos'), 11);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'jpeg'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Album de fotos'), 12);
INSERT INTO DepartmentJobs (department_fk, job_fk, job_dep_id) VALUES (
											(SELECT department_id FROM Departments WHERE dep_name = 'musical group'),
											(SELECT job_id FROM Jobs WHERE job_name = 'Rapper'), 3);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'musica'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Rapper'),
																10
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'fama'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Rapper'),
																11
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'cool'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Rapper'),
																12
															);
INSERT INTO JobRequirements (req_fk, job_fk, job_req_id) VALUES (
															(SELECT requirement_id FROM Requirements WHERE req_name = 'Certificado de lectura'),
															(SELECT job_id from Jobs WHERE job_name = 'Rapper'), 6);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'pdf'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Certificado de lectura'), 13);
INSERT INTO JobRequirements (req_fk, job_fk, job_req_id) VALUES (
															(SELECT requirement_id FROM Requirements WHERE req_name = 'Video de audicion, 4 versos a eleccion'),
															(SELECT job_id from Jobs WHERE job_name = 'Rapper'), 7);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'mp4'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Video de audicion, 4 versos a eleccion'), 14);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'mkv'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Video de audicion, 4 versos a eleccion'), 15);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'wmv'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Video de audicion, 4 versos a eleccion'), 16);
INSERT INTO DepartmentJobs (department_fk, job_fk, job_dep_id) VALUES (
											(SELECT department_id FROM Departments WHERE dep_name = 'Desarrollo'),
											(SELECT job_id FROM Jobs WHERE job_name = 'Desarrollador backend'), 4);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'software'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Desarrollador backend'),
																13
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'developer'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Desarrollador backend'),
																14
															);
INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = 'java'),
																(SELECT job_id FROM Jobs WHERE job_name = 'Desarrollador backend'),
																15
															);
INSERT INTO JobRequirements (req_fk, job_fk, job_req_id) VALUES (
															(SELECT requirement_id FROM Requirements WHERE req_name = 'Constancia de cursos aprobados con 200 creditos o mas'),
															(SELECT job_id from Jobs WHERE job_name = 'Desarrollador backend'), 8);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'pdf'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Constancia de cursos aprobados con 200 creditos o mas'), 17);
INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																	(SELECT format_id FROM Formats WHERE format_name = 'png'),
																	(SELECT requirement_id FROM Requirements WHERE req_name = 'Constancia de cursos aprobados con 200 creditos o mas'), 18);