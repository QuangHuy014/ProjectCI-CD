use Planny
go
create or alter trigger afterCreateCollaborator
    on Collaborator
    after insert
    as
    begin
        insert into Member (role, username, email, fullname, avatar, user_id, board_id)
        select i.role, i.username, i.email, i.fullname, i.avatar, i.user_id, b.board_id
        from inserted i
        join Board b on i.workspace_id = b.workspace_id
    end
go
create or alter trigger afterCreateBoard
    on Board
    after insert
    as
    begin
        insert into Member (role, username, email, fullname, avatar, user_id, board_id)
        select 'admin', u.username, u.email, u.fullname, u.avatar, u.user_id, i.board_id
        from inserted i
        join Workspace w on i.workspace_id = w.workspace_id
        join [User] u on u.user_id = w.user_id
    end
go