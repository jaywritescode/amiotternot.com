CREATE SCHEMA IF NOT EXISTS amiotternot;
CREATE TABLE IF NOT EXISTS amiotternot.images (
    id char(21) PRIMARY KEY,
    keyword text NOT NULL,
    original_id numeric NOT NULL,
    source text NOT NULL,
    width smallint NOT NULL,
    height smallint NOT NULL,
    username text NOT NULL,
    user_id numeric NOT NULL,
    created_on timestamp DEFAULT current_timestamp
);
CREATE TABLE IF NOT EXISTS amiotternot.votes (
    image_id char(21) NOT NULL REFERENCES images (id),
    is_otter boolean NOT NULL,
    created_on timestamp DEFAULT current_timestamp
);