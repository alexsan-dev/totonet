DROP TABLE Departments CASCADE CONSTRAINTS;

CREATE TABLE Departments (
  department_id NUMBER,
  dep_name VARCHAR2(250) NOT NULL,
  total NUMBER NOT NULL,
  PRIMARY KEY(department_id)
);

DROP TABLE Jobs CASCADE CONSTRAINTS;

CREATE TABLE Jobs (
  job_id NUMBER,
  job_name VARCHAR2(250) NOT NULL,
  salary NUMBER NOT NULL,
  PRIMARY KEY(job_id)
);

DROP TABLE DepartmentJobs CASCADE CONSTRAINTS;

CREATE TABLE DepartmentJobs (
  department_fk NUMBER NOT NULL,
  job_fk NUMBER NOT NULL,
  job_dep_id NUMBER,
  PRIMARY KEY(job_dep_id),
  CONSTRAINT department_fk_c FOREIGN KEY (department_fk) REFERENCES Departments (department_id),
  CONSTRAINT job_fk_c FOREIGN KEY (job_fk) REFERENCES Jobs (job_id)
);

DROP TABLE Categories CASCADE CONSTRAINTS;

CREATE TABLE Categories (
  category_id NUMBER,
  category_name VARCHAR2(250) NOT NULL,
  PRIMARY KEY(category_id)
);

DROP TABLE JobCategories CASCADE CONSTRAINTS;

CREATE TABLE JobCategories (
  category_fk NUMBER NOT NULL,
  job_fk NUMBER NOT NULL,
  job_category_id NUMBER,
  PRIMARY KEY(job_category_id),
  CONSTRAINT category_fk_c FOREIGN KEY (category_fk) REFERENCES Categories (category_id),
  CONSTRAINT job_c_fk_c FOREIGN KEY (job_fk) REFERENCES Jobs (job_id)
);

DROP TABLE Requirements CASCADE CONSTRAINTS;

CREATE TABLE Requirements (
  req_id NUMBER,
  req_name VARCHAR2(250) NOT NULL,
  r_size NUMBER NOT NULL,
  r_required NUMBER(1) NOT NULL,
  PRIMARY KEY(req_id)
);

DROP TABLE JobRequirements CASCADE CONSTRAINTS;

CREATE TABLE JobRequirements (
  req_fk NUMBER NOT NULL,
  job_fk NUMBER NOT NULL,
  job_req_id NUMBER,
  PRIMARY KEY(job_req_id),
  CONSTRAINT req_fk_c FOREIGN KEY (req_fk) REFERENCES Requirements (req_id),
  CONSTRAINT job_r_fk_c FOREIGN KEY (job_fk) REFERENCES Jobs (job_id)
);

DROP TABLE Formats CASCADE CONSTRAINTS;

CREATE TABLE Formats (
  format_id NUMBER,
  format_name VARCHAR2(250) NOT NULL,
  PRIMARY KEY(format_id)
);

DROP TABLE ReqFormats CASCADE CONSTRAINTS;

CREATE TABLE ReqFormats (
  format_fk NUMBER NOT NULL,
  req_fk NUMBER NOT NULL,
  req_format_id NUMBER,
  PRIMARY KEY(req_format_id),
  CONSTRAINT format_fk_c FOREIGN KEY (format_fk) REFERENCES Formats (format_id),
  CONSTRAINT req_f_fk_c FOREIGN KEY (req_fk) REFERENCES Requirements (req_id)
);