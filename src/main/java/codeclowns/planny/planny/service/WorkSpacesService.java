package codeclowns.planny.planny.service;

import codeclowns.planny.planny.data.dto.WorkspacesDto;
import codeclowns.planny.planny.data.entity.WorkSpaceE;
import java.util.List;


public interface WorkSpacesService {
    List<WorkSpaceE> getAllEnableWorkspaces(WorkspacesDto workspacesDto) throws Exception;
    List<WorkSpaceE> getAllWorkspaces(WorkspacesDto workspacesDto) throws Exception;
    WorkSpaceE saveWorkspace(WorkspacesDto workspacesDto) throws Exception;
    Object deleteWorkspace(WorkspacesDto workspacesDto) throws Exception;

}
