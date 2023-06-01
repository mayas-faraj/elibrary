CREATE TABLE publication_categories (
	id INT AUTO_INCREMENT,
	name VARCHAR(50),
	PRIMARY KEY (id)
);

CREATE TABLE blog_types (
	id INT AUTO_INCREMENT,
	name VARCHAR(50),
	PRIMARY KEY (id)
);

CREATE TABLE articles_types (
	id INT AUTO_INCREMENT,
	name VARCHAR(50),
	PRIMARY KEY (id)
);

CREATE TABLE articles  (
	id INT AUTO_INCREMENT,
	slug VARCHAR(150) NOT NULL,
	title VARCHAR(150) NOT NULL,
	excerpt VARCHAR(500),
	type_id INT NOT NULL,
	image VARCHAR(200) NOT NULL,
	content TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (type_id) REFERENCES articles_types(id)
);

CREATE TABLE sections (
	id INT AUTO_INCREMENT,
	slug VARCHAR(100) NOT NULL,
	fragment_title VARCHAR(50),
	title VARCHAR(100),
	sub_title VARCHAR(100),
	header_text VARCHAR(100),
	content TEXT,
	footer_text VARCHAR(100),
	UNIQUE (slug),
	PRIMARY KEY (id)
);

CREATE TABLE section_images (
	id INT AUTO_INCREMENT,
	image_src VARCHAR(300),
	image_alt VARCHAR(300),
	section_id INT NOT NULL,
	title VARCHAR(100),
	content TEXT,
	PRIMARY KEY (id),
	FOREIGN KEY (section_id) REFERENCES sections(id)
);

CREATE TABLE blogs (
	id INT AUTO_INCREMENT,
	type_id INT NOT NULL,
	title VARCHAR(150) NOT NULL,
	image VARCHAR(200) NOT NULL,
	source_name VARCHAR(100),
	source_link VARCHAR(250),
	post_date TIMESTAMP,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (type_id) REFERENCES blog_types(id)
);

CREATE TABLE books (
	id INT AUTO_INCREMENT,
	slug VARCHAR(150) NOT NULL,
	title VARCHAR(150) NOT NULL,
	image VARCHAR(200) NOT NULL,
	preface VARCHAR(500),
	content TEXT,
	year INT,
	month INT,
	author VARCHAR(100),
	language VARCHAR(100),
	city VARCHAR(100),
	series VARCHAR(100),
	format VARCHAR(100),
	isbn VARCHAR(100),
	comment VARCHAR(250),
	pages_count INT,
	book_file VARCHAR(200),
	book_file_pages_per_view INT DEFAULT 1,
	revision_file VARCHAR(200),
	revision_file_pages_per_view INT DEFAULT 1,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE essays (
	id INT AUTO_INCREMENT,
	slug VARCHAR(150) NOT NULL,
	title VARCHAR(300) NOT NULL,
	homepage_title VARCHAR(300) NOT NULL,
	book_name VARCHAR(100),
	preface TEXT,
	image VARCHAR(200) NOT NULL,
	year INT,
	month INT,
	day INT,
	city VARCHAR(100),
	series VARCHAR(100),
	comment VARCHAR(250),
	book_file VARCHAR(200),
	book_file_pages_per_view INT DEFAULT 1,
	link VARCHAR(300),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE events (
	id INT AUTO_INCREMENT,
	year VARCHAR(30) NOT NULL,
	title VARCHAR(1200) NOT NULL,
	PRIMARY KEY (id)
);

CREATE VIEW blogs_view AS
SELECT blog_types.name As type, title, image, source_name, source_link, post_date
FROM blogs
INNER JOIN blog_types ON blogs.type_id=blog_types.id
ORDER BY blogs.created_at DESC;

CREATE VIEW books_view AS
SELECT slug, title, image, preface, year, month, author, series, format, isbn, comment, pages_count, book_file, revision_file
FROM books
ORDER BY books.year, books.month;

CREATE VIEW essays_view AS select essays.slug AS slug,essays.title AS title,homepage_title, essays.book_name AS book_name,essays.content AS content,essays.image AS image,essays.year AS year,essays.month AS month,essays.city AS city,essays.series AS series,essays.comment AS comment,essays.book_file AS book_file,essays.book_file_pages_per_view AS book_file_pages_per_view, link 
from essays
order by essays.year,essays.month;

CREATE VIEW articles_view AS
SELECT slug, title, excerpt, articles_types.name AS type, image
FROM articles
INNER JOIN articles_types ON type_id=articles_types.id;

CREATE VIEW sections_view AS
SELECT slug, fragment_title, sections.title, sub_title, header_text, sections.content, footer_text, (SELECT image_src FROM section_images WHERE section_id=sections.id LIMIT 1) AS image_src FROM sections ORDER BY id;

CREATE VIEW sections_about_it_view AS
SELECT slug, fragment_title, sections.title, sub_title, header_text, sections.content, footer_text, (SELECT image_src FROM section_images WHERE section_id=sections.id LIMIT 1) AS image_src FROM sections WHERE slug LIKE "%-it-%";

CREATE VIEW sections_about_en_view AS
SELECT slug, fragment_title, sections.title, sub_title, header_text, sections.content, footer_text, (SELECT image_src FROM section_images WHERE section_id=sections.id LIMIT 1) AS image_src FROM sections WHERE slug LIKE "%-en-%";

CREATE VIEW sections_about_fr_view AS
SELECT slug, fragment_title, sections.title, sub_title, header_text, sections.content, footer_text, (SELECT image_src FROM section_images WHERE section_id=sections.id LIMIT 1) AS image_src FROM sections WHERE slug LIKE "%-fr-%";

CREATE VIEW section_images_view AS
SELECT slug, image_src, image_alt, section_images.title, section_images.content
FROM sections INNER JOIN section_images ON section_images.section_id=sections.id;


UPDATE articles SET slug=LOWER(TRIM both '-' FROM REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(title, '[\n\r]', ''), '[\\s+`,\(\)‘’”“\'\.:]', '-'), '-+', '-')));

