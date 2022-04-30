--- join tables ---

DROP TABLE IF EXISTS maps_users CASCADE;
DROP TABLE IF EXISTS maps_points CASCADE;

CREATE TABLE maps_users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  date_contributed DATE,
  favourite BOOLEAN
);


