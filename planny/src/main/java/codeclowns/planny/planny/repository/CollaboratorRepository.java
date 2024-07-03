
package codeclowns.planny.planny.repository;

import codeclowns.planny.planny.data.entity.Collaborator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollaboratorRepository extends JpaRepository<Collaborator,Integer> {
    List<Collaborator> findByWorkSpace_WorkspaceId(Integer workspaceId);
    List<Collaborator> findByUsernameContainingIgnoreCase(String username);
   @Query("SELECT c FROM Collaborator c " +
           "WHERE c.collaboratorId = :collaboratorId " +
           "AND c.workSpace.workspaceId = :workspaceId"
         )
    Optional<Collaborator> findByCollaboratorIdAndWorkSpaceId(
        @Param("collaboratorId") Integer collaboratorId,
        @Param("workspaceId") Integer workspaceId
    );
}
