package codeclowns.planny.planny.service;

import codeclowns.planny.planny.data.entity.Collaborator;

import java.util.List;

public interface CollaboratorService {
    List<Collaborator> getCollaboratorsByWorkspaceId(Integer workspaceId);
    List<Collaborator> searchCollaboratorsByUsername(String username);
    byte deleteCollaboratorFromWorkspace(Integer collaboratorId, Integer workspaceId);
}
