package codeclowns.planny.planny.repository;

import codeclowns.planny.planny.data.entity.WorkSpaceE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkSpaceRepository extends JpaRepository<WorkSpaceE,Integer> {
    @Query(value = "SELECT TOP 3 workspace_id, workspace_name, short_name, " +
                    "website, description, is_enabled, user_id FROM Workspace", nativeQuery = true)
    List<WorkSpaceE> findTop3ByOrderByLastViewedDesc();

    @Query(value = "SELECT workspace_id, workspace_name, short_name, " +
                    "website, description, is_enabled, user_id " +
                   "FROM [Workspace] WHERE user_id = :userId and is_enabled = 1", nativeQuery = true)
    List<WorkSpaceE> getAllByUser(@Param("userId") int userId);
}
