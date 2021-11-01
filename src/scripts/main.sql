CREATE TABLE Departments (
  department_id NUMBER,
  dep_name VARCHAR2(250) NOT NULL,
  total NUMBER NOT NULL,
  PRIMARY KEY(department_id)
);

CREATE TABLE Jobs (
  job_id NUMBER,
  job_name VARCHAR2(250) NOT NULL,
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
  user_id NUMBER NOT NULL,
  user_role VARCHAR2(250) NOT NULL,
  user_name VARCHAR2(250) NOT NULL,
  department_fk VARCHAR2(250),
  password VARCHAR2(250) NOT NULL,
  dateIn VARCHAR2(250) NOT NULL,
  dateOut VARCHAR2(250),
  CONSTRAINT department_user_fk FOREIGN KEY (department_fk) REFERENCES Departments (department_id)
)