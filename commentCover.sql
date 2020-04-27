CREATE TABLE users (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `password` varchar(16) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE comments (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(30) NOT NULL,
  `article_id` int(11) NOT NULL,
  `wrote_by` varchar(10) NOT NULL,
  `likes` int(11) default 0,
  `dislikes` int(11) default 0,
  PRIMARY KEY (`id`)
);

CREATE TABLE likes (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`comment_id`) REFERENCES comments(id) on delete cascade,
  FOREIGN KEY (`user_id`) REFERENCES users(id) on delete cascade
);

CREATE TABLE dislikes (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`comment_id`) REFERENCES comments(id) on delete cascade,
  FOREIGN KEY (`user_id`) REFERENCES users(id) on delete cascade
);
