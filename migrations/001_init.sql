CREATE TABLE USERS (
                       id uuid PRIMARY KEY default gen_random_uuid(),
                       discord_id text unique ,
                       username text,
                       discriminator text,
                       avatar text,
                       email text,
                       created_at timestamptz default  now(),
                       updated_at timestamptz default now()
),

CREATE TABLE POSTS (
                       id uuid primary key  default  gen_random_uuid(),
                       user_id uuid not null references users(id) on delete cascade ,
                       title text not null ,
                       body text not null ,
                       created_at timestamptz default now(),
                       updated_at timestamptz default now(),
                       CONSTRAINT user_post_same UNIQUE (user_id, title)
);

ALTER TABLE POSTS ADD  CONSTRAINT user_post_same UNIQUE (user_id, title);
ALTER TABLE posts
    ADD CONSTRAINT user_post_same UNIQUE (user_id, title);
ALTER TABLE comments
    ADD COLUMN edit_count integer DEFAULT 0;


ALTER TABLE COMMENTS ADD CONSTRAINT user_post_comment_unique UNIQUE (post_id, user_id);
ALTER TABLE COMMENTS ADD CONSTRAINT EDIT_COUNT_LIMIT CHECK (comments.edit_count < 4);

-- // EDIT COMMENTS

UPDATE comments
SET body = 'I LOVE YOUR BLOGS PLEASE POST MORE EVERY WEEK TAHNSK', edit_count = edit_count + 1,
    updated_at = now()
WHERE id = 'd7368f55-0eb7-46c3-941f-3950238d4bd1';


DELETE FROM comments
WHERE ID = '94558c00-d260-4fca-b2bd-14629651a220';
create table comments (
                          id uuid primary key default gen_random_uuid(),
                          post_id uuid references posts(id) on  delete cascade ,
                          user_id uuid not null references users(id) on delete cascade ,
                          body text not null ,
                          created_at timestamptz default now(),
                          updated_at timestamptz default now()
)


-- likes (one like per (user, post))
CREATE TABLE likes (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
                       user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                       created_at TIMESTAMPTZ DEFAULT now(),
                       CONSTRAINT unique_user_post_like UNIQUE (post_id, user_id)
);


CREATE INDEX IDX_POSTS_USER_ID ON POSTS(user_id);
CREATE INDEX IDX_COMMENTS_POST_ID ON comments(post_id);
CREATE INDEX IDX_LIKES_POST_ID ON LIKES(post_id)

DROP TABLE TASKS;

select * from users;

SELECT  *  FROM posts
WHERE user_id = '484c00cd-fb31-40fe-a22e-00402ed29f6e';

INSERT INTO POSTS (user_id, title, body) VALUES ('484c00cd-fb31-40fe-a22e-00402ed29f6e', 'Russia is going to war with Ukraine on the 3rd of the Month ', 'Ukraine is a stratical place to wac war on.')

INSERT INTO POSTS (user_id, title, body) VALUES ('6ad397c0-5daf-4843-b90f-58c463acfd88', 'Mikue', 'Lorem daskdkas foaskfks')

DELETE FROM POSTS
WHERE ID = 'e489eacd-dd37-4a55-9c1b-2c0ae93ba50d';


SELECT * FROM comments;