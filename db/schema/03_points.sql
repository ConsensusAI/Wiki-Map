--- points table ---

DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255) NOT NULL,
  latitude NUMBER,
  longitude NUMBER,
  created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
);

