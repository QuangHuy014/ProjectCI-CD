use Planny;
insert into Account (username, email, password) values
('khoadz', 'admin@gmail.com', '$2a$10$7NJakCydtyXhhKWgoJp38e3BCgF3jmK7rP5sk2NxK/lsuwBkBKVAG')

-- Insert records into Account table
INSERT INTO [Account] (username, email, sub, password)
VALUES
('user1', 'user1@example.com', 'sub1', 'password1'),
('user2', 'user2@example.com', 'sub2', 'password2'),
('user3', 'user3@example.com', 'sub3', 'password3'),
('user4', 'user4@example.com', 'sub4', 'password4'),
('user5', 'user5@example.com', 'sub5', 'password5');
GO

-- Insert records into User table
INSERT INTO [User] (user_id, username, email, fullname, avatar, dob, gender, is_private)
VALUES
(1, 'user1', 'user1@example.com', 'User One', 'avatar1.png', '1990-01-01', 1, 0),
(2, 'user2', 'user2@example.com', 'User Two', 'avatar2.png', '1991-02-02', 0, 0),
(3, 'user3', 'user3@example.com', 'User Three', 'avatar3.png', '1992-03-03', 1, 1),
(4, 'user4', 'user4@example.com', 'User Four', 'avatar4.png', '1993-04-04', 0, 0),
(5, 'user5', 'user5@example.com', 'User Five', 'avatar5.png', '1994-05-05', 1, 1);
GO

-- Insert records into Workspace table
INSERT INTO [Workspace] (workspace_name, short_name, website, description, is_enabled, user_id)
VALUES
('Workspace One', 'ws1', 'http://workspace1.com', 'Description for Workspace One', 1, 1),
('Workspace Two', 'ws2', 'http://workspace2.com', 'Description for Workspace Two', 1, 2),
('Workspace Three', 'ws3', 'http://workspace3.com', 'Description for Workspace Three', 1, 3),
('Workspace Four', 'ws4', 'http://workspace4.com', 'Description for Workspace Four', 1, 4),
('Workspace Five', 'ws5', 'http://workspace5.com', 'Description for Workspace Five', 1, 5);
GO

-- Insert records into Board table
INSERT INTO [Board] (board_name, short_name, slug_url, visibility, is_enabled, workspace_id)
VALUES
('Board One', 'b1', 'board-one', 'Public', 1, 1),
('Board Two', 'b2', 'board-two', 'Private', 1, 2),
('Board Three', 'b3', 'board-three', 'Public', 1, 3),
('Board Four', 'b4', 'board-four', 'Private', 1, 4),
('Board Five', 'b5', 'board-five', 'Public', 1, 5);
GO

-- Insert records into List table
INSERT INTO [List] (title, ordinal_numeral, is_enabled, board_id)
VALUES
('List One', 1, 1, 1),
('List Two', 2, 1, 2),
('List Three', 3, 1, 3),
('List Four', 4, 1, 4),
('List Five', 5, 1, 5);
GO

-- Insert records into Card table
INSERT INTO [Card] (title, description, cover, start_date, due_date, is_completed, short_name, slug_url, is_enabled, list_id)
VALUES
('Card One', 'Description for Card One', 'cover1.png', '2023-01-01', '2023-01-31', 0, 'card-one', 'card-one', 1, 1),
('Card Two', 'Description for Card Two', 'cover2.png', '2023-02-01', '2023-02-28', 0, 'card-two', 'card-two', 1, 2),
('Card Three', 'Description for Card Three', 'cover3.png', '2023-03-01', '2023-03-31', 0, 'card-three', 'card-three', 1, 3),
('Card Four', 'Description for Card Four', 'cover4.png', '2023-04-01', '2023-04-30', 0, 'card-four', 'card-four', 1, 4),
('Card Five', 'Description for Card Five', 'cover5.png', '2023-05-01', '2023-05-31', 0, 'card-five', 'card-five', 1, 5);
GO

-- Insert records into Collaborator table
INSERT INTO [Collaborator] (role, username, email, fullname, avatar, user_id, workspace_id)
VALUES
('Role One', 'collab1', 'collab1@example.com', 'Collaborator One', 'avatar1.png', 2, 1),
('Role Two', 'collab2', 'collab2@example.com', 'Collaborator Two', 'avatar2.png', 1, 2),
('Role Three', 'collab3', 'collab3@example.com', 'Collaborator Three', 'avatar3.png', 5, 3),
('Role Four', 'collab4', 'collab4@example.com', 'Collaborator Four', 'avatar4.png', 3, 4),
('Role Five', 'collab5', 'collab5@example.com', 'Collaborator Five', 'avatar5.png', 4, 5);
GO

-- Insert records into Member table
-- INSERT INTO [Member] (role, username, email, avatar, fullname, is_enabled, user_id, board_id)
-- VALUES
-- ('Member Role One', 'member1', 'member1@example.com', 'avatar1.png', 'Member One', 1, 1, 1),
-- ('Member Role Two', 'member2', 'member2@example.com', 'avatar2.png', 'Member Two', 1, 2, 2),
-- ('Member Role Three', 'member3', 'member3@example.com', 'avatar3.png', 'Member Three', 1, 3, 3),
-- ('Member Role Four', 'member4', 'member4@example.com', 'avatar4.png', 'Member Four', 1, 4, 4),
-- ('Member Role Five', 'member5', 'member5@example.com', 'avatar5.png', 'Member Five', 1, 5, 5);
-- GO

-- Insert records into Card_Conductor table
INSERT INTO [Card_Conductor] (assigned_time, card_id, member_id)
VALUES
(GETDATE(), 1, 1),
(GETDATE(), 2, 2),
(GETDATE(), 3, 3),
(GETDATE(), 4, 4),
(GETDATE(), 5, 5);
GO
select * from Workspace