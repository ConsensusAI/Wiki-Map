--- points table ---

DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255) NOT NULL,
  latitude DECIMAL,
  longitude DECIMAL,
  created_by INTEGER REFERENCES users(id) ON DELETE CASCADE
);

