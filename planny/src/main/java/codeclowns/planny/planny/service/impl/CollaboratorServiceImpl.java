// CollaboratorServiceImpl.java
package codeclowns.planny.planny.service.impl;

import codeclowns.planny.planny.data.entity.Collaborator;
import codeclowns.planny.planny.repository.CollaboratorRepository;
import codeclowns.planny.planny.service.CollaboratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CollaboratorServiceImpl implements CollaboratorService {

    private final CollaboratorRepository collaboratorRepository;


    @Override
    public List<Collaborator> getCollaboratorsByWorkspaceId(Integer workspaceId) {
        return collaboratorRepository.findByWorkSpace_WorkspaceId(workspaceId);
    }

    @Override
    public List<Collaborator> searchCollaboratorsByUsername(String username) {
        return collaboratorRepository.findByUsernameContainingIgnoreCase(username);
    }

    @Override
    @Transactional
    public byte deleteCollaboratorFromWorkspace(Integer collaboratorId, Integer workspaceId) {
        byte rowAffected = 0;
        Optional<Collaborator> collaboratorOptional = collaboratorRepository.findByCollaboratorIdAndWorkSpaceId(collaboratorId,workspaceId);
        if (collaboratorOptional.isPresent()) {
           collaboratorRepository.delete(collaboratorOptional.get());
           rowAffected=1;
        }
        return rowAffected;
    }
}
