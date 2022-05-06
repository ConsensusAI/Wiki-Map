--- joins table ---

INSERT INTO maps_users (user_id, map_id, date_contributed) VALUES (1, 1, '04/28/2022');
INSERT INTO maps_users (user_id, map_id, date_contributed) VALUES (1, 1, '04/28/2022');
INSERT INTO maps_users (user_id, map_id) VALUES (2, 2);
INSERT INTO maps_users (user_id, map_id) VALUES (1, 1);
INSERT INTO maps_users (user_id, map_id) VALUES (3, 3);
INSERT INTO maps_users (user_id, map_id, date_contributed) VALUES (3, 3, '04/28/2022');
INSERT INTO maps_users (user_id, map_id) VALUES (1, 2);

INSERT INTO favourites (user_id, map_id, favourite) VALUES (1, 1, TRUE);
INSERT INTO favourites (user_id, map_id, favourite) VALUES (1, 3, TRUE);
INSERT INTO favourites (user_id, map_id, favourite) VALUES (2, 2, TRUE);
