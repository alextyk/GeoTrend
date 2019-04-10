DROP DATABASE IF EXISTS geotrend_db;
CREATE DATABASE geotrend_db;

-- CREATE TABLE `geotrend_db`.`cities` (
--   `city_name` TEXT NOT NULL,
--   `num_searches` INT NULL,
--   `date_added` DATETIME NULL,
--   `date_modified` DATETIME NULL DEFAULT NOW(),
--   `id` INT NOT NULL AUTO_INCREMENT,
--   PRIMARY KEY (`id`));

--   CREATE TABLE `geotrend_db`.`trends` (
--   `trend` TEXT NULL,
--   `hashtag` TEXT NULL,
--   `num_clicks` INT NULL,
--   `city_id` INT NULL,
--   `date_added` DATETIME NULL,
--   `date_modified` DATETIME NULL,
--   `id` INT NOT NULL AUTO_INCREMENT,
--   INDEX `city_id_idx` (`city_id` ASC) VISIBLE,
--   PRIMARY KEY (`id`),
--   CONSTRAINT `city_id`
--     FOREIGN KEY (`city_id`)
--     REFERENCES `geotrend_db`.`cities` (`id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE);

--   CREATE TABLE `geotrend_db`.`trendy_tweets` (
--   `trend_id` INT NULL,
--   `twitter_username` TEXT NULL,
--   `twitter_user_follower_count` INT NULL,
--   `num_retweets` INT NULL,
--   `num_favorites` INT NULL,
--   `tweet_url` TEXT NULL,
--   `date_added` DATETIME NULL,
--   `date_modified` DATETIME NULL,
--   `id` INT NOT NULL AUTO_INCREMENT,
--   PRIMARY KEY (`id`),
--   CONSTRAINT `trend_id`
--     FOREIGN KEY (`trend_id`)
--     REFERENCES `geotrend_db`.`trends` (`id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE);
-- =======
-- DROP DATABASE IF EXISTS twitter_db;
-- CREATE DATABASE twitter_db;
