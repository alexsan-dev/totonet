CREATE TABLE Departments (
  department_id NUMBER NOT NULL,
  dep_name VARCHAR2(250) NOT NULL,
  total NUMBER NOT NULL,
  dep_fk NUMBER,
  PRIMARY KEY(department_id),
  CONSTRAINT sub_department_fk FOREIGN KEY (dep_fk) REFERENCES Departments (department_id)
);

CREATE TABLE Jobs (
  job_id NUMBER NOT NULL,
  job_name VARCHAR2(250) NOT NULL,
  image VARCHAR(500),
  salary NUMBER NOT NULL,
  PRIMARY KEY(job_id)
);

CREATE TABLE Categories (
  category_id NUMBER,
  category_name VARCHAR2(250) NOT NULL,
  PRIMARY KEY(category_id)
);

CREATE TABLE Requirements (
  requirement_id NUMBER,
  req_name VARCHAR2(250) NOT NULL,
  r_size NUMBER NOT NULL,
  r_required NUMBER(1) NOT NULL,
  PRIMARY KEY(requirement_id)
);

CREATE TABLE Formats (
  format_id NUMBER,
  format_name VARCHAR2(250) NOT NULL,
  PRIMARY KEY(format_id)
);

CREATE TABLE JobScores (
  job_score_id NUMBER,
  job_fk NUMBER NOT NULL,
  score NUMBER,
  PRIMARY KEY(job_score_id),
  CONSTRAINT job_score_fk FOREIGN KEY (job_fk) REFERENCES Jobs (job_id)
);

CREATE TABLE DepartmentJobs (
  department_fk NUMBER NOT NULL,
  job_fk NUMBER NOT NULL,
  job_dep_id NUMBER,
  PRIMARY KEY(job_dep_id),
  CONSTRAINT department_fk_c FOREIGN KEY (department_fk) REFERENCES Departments (department_id),
  CONSTRAINT job_fk_c FOREIGN KEY (job_fk) REFERENCES Jobs (job_id)
);

CREATE TABLE JobCategories (
  category_fk NUMBER NOT NULL,
  job_fk NUMBER NOT NULL,
  job_category_id NUMBER,
  PRIMARY KEY(job_category_id),
  CONSTRAINT category_fk_c FOREIGN KEY (category_fk) REFERENCES Categories (category_id),
  CONSTRAINT job_c_fk_c FOREIGN KEY (job_fk) REFERENCES Jobs (job_id)
);

CREATE TABLE JobRequirements (
  req_fk NUMBER NOT NULL,
  job_fk NUMBER NOT NULL,
  job_req_id NUMBER,
  PRIMARY KEY(job_req_id),
  CONSTRAINT req_fk_c FOREIGN KEY (req_fk) REFERENCES Requirements (requirement_id),
  CONSTRAINT job_r_fk_c FOREIGN KEY (job_fk) REFERENCES Jobs (job_id)
);

CREATE TABLE ReqFormats (
  format_fk NUMBER NOT NULL,
  req_fk NUMBER NOT NULL,
  req_format_id NUMBER,
  PRIMARY KEY(req_format_id),
  CONSTRAINT format_fk_c FOREIGN KEY (format_fk) REFERENCES Formats (format_id),
  CONSTRAINT req_f_fk_c FOREIGN KEY (req_fk) REFERENCES Requirements (requirement_id)
);

CREATE TABLE Users (
  user_role VARCHAR2(250) NOT NULL,
  user_name VARCHAR2(250) NOT NULL,
  password VARCHAR2(250) NOT NULL,
  active NUMBER(1) NOT NULL,
  user_id NUMBER NOT NULL,
  date_out VARCHAR2(250),
  date_in VARCHAR2(250),
  department_fk NUMBER,
  PRIMARY KEY(user_id),
  CONSTRAINT department_user_fk FOREIGN KEY (department_fk) REFERENCES Departments (department_id)
);

CREATE TABLE JobsApply (
  user_fk NUMBER NOT NULL,
  job_fk NUMBER NOT NULL,
  job_apply_id NUMBER,
  cui NUMBER,
	apply_name VARCHAR2(250),
	last_name VARCHAR2(250),
	email VARCHAR2(250),
	apply_address VARCHAR2(250),
	phone VARCHAR2(250),
	cv VARCHAR2(250),
  date_in VARCHAR2(250),
  PRIMARY KEY(job_apply_id),
  CONSTRAINT job_apply_fk FOREIGN KEY (job_fk) REFERENCES Jobs (job_id),
  CONSTRAINT job_apply_user_fk FOREIGN KEY (user_fk) REFERENCES Users (user_id)
);

CREATE SEQUENCE users_seq START WITH 2 INCREMENT BY 1 CACHE 100;
CREATE SEQUENCE jobs_apply_seq START WITH 1 INCREMENT BY 1 CACHE 100;
CREATE SEQUENCE jobs_score_seq START WITH 1 INCREMENT BY 1 CACHE 100;

INSERT INTO Users VALUES ('admin', 'admin', 'admin', 1, 1, NULL, NULL, NULL);
COMMIT;
