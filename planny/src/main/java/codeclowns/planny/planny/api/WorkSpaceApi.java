package codeclowns.planny.planny.api;


import codeclowns.planny.planny.constant.BasicApiConstant;
import codeclowns.planny.planny.data.dto.WorkSpaceDto;
import codeclowns.planny.planny.data.mgt.ResponseObject;
import codeclowns.planny.planny.security.service.AuthService;
import codeclowns.planny.planny.service.WorkSpaceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api-public/workspace")
public class WorkSpaceApi {
    final WorkSpaceService workSpaceService;
    final AuthService authService;

    @PostMapping("/PostSaveWorkSpace")
    public ResponseObject<?> doPostSaveWorkSpace(@Valid @RequestBody WorkSpaceDto workSpaceDto) {
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(workSpaceService.saveWorkSpace(workSpaceDto));
            resultApi.setStatus("success");
        } catch (Exception e) {
            resultApi.setStatus(BasicApiConstant.FAILED.getStatus());
            resultApi.setMessage(BasicApiConstant.ERROR.getStatus());
        }
    return resultApi;
    }
    @GetMapping("/recently-viewed")
    public ResponseObject<?> getRecentlyViewedWorkspaces(WorkSpaceDto workSpaceDto) {
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(workSpaceService.getWorkSpace(workSpaceDto));
            resultApi.setStatus("success");
            resultApi.setMessage("success");
        } catch (Exception e) {
            resultApi.setStatus("fail");
            resultApi.setMessage("fail");
        }
        return resultApi;
    }

    @GetMapping("/doGetWorkspaceByUser")
    public ResponseObject<?> getAllByUser() {
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(workSpaceService.getAllByUser(authService.getCurrentUser().getAccountId()));
            resultApi.setStatus("success");
            resultApi.setMessage("success");
        } catch (Exception e) {
             resultApi.setStatus(BasicApiConstant.FAILED.getStatus());
            resultApi.setMessage(BasicApiConstant.ERROR.getStatus());
            log.error("Fail When Call API /api-public/workspace/doGetWorkspaceByUser : ", e);
        }
        return resultApi;
    }
}
