

DROP TABLE IF EXISTS notes;

CREATE TABLE notes(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now()
);

INSERT INTO notes (title, content) VALUES ('STEVES NOTE', 'CONTENT')

