package codeclowns.planny.planny.repository;

import codeclowns.planny.planny.data.entity.MemberE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MemberRepository extends JpaRepository<MemberE, Integer> {
      @Query(value = "select * from [Member] " +
                     "where board_id=:board_Id",
                      nativeQuery = true)
     List<MemberE> findMemberEByBoard(@Param("board_Id") Integer board_Id );

       @Query(value = "SELECT * FROM Member m " +
                      "WHERE m.board_id IN " +
                      "(SELECT b.board_id FROM Board b " +
                      "WHERE b.workspace_id = :workspaceId)",
                      nativeQuery = true)
    List<MemberE> findMembersByWorkspaceId(@Param("workspaceId") Integer workspaceId);
}
