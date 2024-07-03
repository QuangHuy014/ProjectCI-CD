package codeclowns.planny.planny.repository;

import codeclowns.planny.planny.data.entity.WorkSpaceE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface WorkSpacesRepository extends JpaRepository<WorkSpaceE,Integer> {
    List<WorkSpaceE> findAllByIsEnabledTrueAndUserId(Long userId);
    @Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END FROM Workspace WHERE workspace_name = :workspaceName",nativeQuery = true)
    int existsByWorkspaceName(@Param("workspaceName") String workspaceName);
    @Query(value = "SELECT * FROM Workspace WHERE workspace_name = :workspaceName",nativeQuery = true)
    WorkSpaceE findByWorkspaceName(@Param("workspaceName") String workspaceName);
}
