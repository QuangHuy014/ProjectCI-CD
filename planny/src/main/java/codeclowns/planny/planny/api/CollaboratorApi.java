package codeclowns.planny.planny.api;

import codeclowns.planny.planny.constant.BasicApiConstant;
import codeclowns.planny.planny.data.mgt.ResponseObject;
import codeclowns.planny.planny.service.CollaboratorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api-public/collaborators")
public class CollaboratorApi {

    private final CollaboratorService collaboratorService;

    @Autowired
    public CollaboratorApi(CollaboratorService collaboratorService) {
        this.collaboratorService = collaboratorService;
    }

    @GetMapping("/getInformation")
    public ResponseObject<?> getCollaboratorsByWorkspaceId(@RequestParam Integer workspaceId) {
            var resultApi=new ResponseObject<>();
        try {
             resultApi.setData(collaboratorService.getCollaboratorsByWorkspaceId(workspaceId));
             resultApi.setStatus("success");
            resultApi.setMessage("success");
        }catch (Exception e){
             resultApi.setStatus(BasicApiConstant.FAILED.getStatus());
            resultApi.setMessage(BasicApiConstant.ERROR.getStatus());
            log.error("Fail when call api /api-public/collaborator/getInformation",e);
        }
        return resultApi;
    }
     @GetMapping("/searchByUsername")
    public ResponseObject<?> searchCollaboratorsByUsername(@RequestParam String username) {
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(collaboratorService.searchCollaboratorsByUsername(username));
            resultApi.setStatus("success");
            resultApi.setMessage("success");
        } catch (Exception e) {
            resultApi.setStatus(BasicApiConstant.FAILED.getStatus());
            resultApi.setMessage(BasicApiConstant.ERROR.getStatus());
            log.error("Fail when call api /api-public/collaborators/searchByUsername", e);
        }
        return resultApi;
    }

      @DeleteMapping("/delete")
    public ResponseObject<?> deleteCollaboratorFromWorkspace(@RequestParam Integer collaboratorId, @RequestParam Integer workspaceId) {
        var resultApi = new ResponseObject<>();
        try {
            var rowEffect = collaboratorService.deleteCollaboratorFromWorkspace(collaboratorId, workspaceId);
            resultApi.setData(rowEffect);
            resultApi.setStatus(rowEffect == 0 ?"false":"success");
            resultApi.setMessage(rowEffect == 0 ? BasicApiConstant.FAILED.getStatus() : BasicApiConstant.SUCCEED.getStatus());
        } catch (Exception e) {
            resultApi.setStatus(BasicApiConstant.FAILED.getStatus());
            resultApi.setMessage(BasicApiConstant.ERROR.getStatus());
            log.error("Fail when call api /api-public/collaborators/delete", e);
        }
        return resultApi;
    }
}
