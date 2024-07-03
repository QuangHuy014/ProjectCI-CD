package codeclowns.planny.planny.repository;

import codeclowns.planny.planny.data.entity.BoardE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardE,Integer> {
List<BoardE> findAllByWorkSpaceUserIdAndWorkSpaceIsEnabledTrueAndIsEnabledTrue(Long userId);


     @Query(value = "SELECT * FROM Board WHERE workspace_id = :workspace_id", nativeQuery = true)
     List<BoardE> findBoardByWorkSpace(@Param("workspace_id") Integer workspace_id);

     @Query(value = "SELECT b.board_id, b.board_name, b.short_name AS board_short_name, b.slug_url, " +
            "b.visibility, b.is_enabled AS board_is_enabled, b.workspace_id, " +
            "m.member_id, m.role AS member_role, m.username AS member_username, " +
            "m.email AS member_email, m.avatar AS member_avatar, m.fullname AS member_fullname, " +
            "m.is_enabled AS member_is_enabled " +
            "FROM Board b " +
            "INNER JOIN Member m ON b.board_id = m.board_id " +
            "WHERE b.workspace_id = :workspace_id", nativeQuery = true)
     List<Object[]> findBoardWithMembersInWorkspace(@Param("workspace_id") Integer workspace_id);

     BoardE findBySlugUrl(String slugUrl);

     Boolean existsBySlugUrl(String slugUrl);
}
