package codeclowns.planny.planny.api;

import codeclowns.planny.planny.constant.BasicApiConstant;
import codeclowns.planny.planny.constant.LoginStatus;
import codeclowns.planny.planny.data.dto.WorkspacesDto;
import codeclowns.planny.planny.data.mgt.ResponseObject;
import codeclowns.planny.planny.service.WorkSpacesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api-public/workspaces")
@RequiredArgsConstructor
@Slf4j
public class WorkSpacesApi {
    private final WorkSpacesService workSpacesService;
    @GetMapping("/getAllWorkSpaces")
    public ResponseObject<?> doGetAllWorkSpaces(WorkspacesDto workspacesDto) {
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(workSpacesService.getAllWorkspaces(workspacesDto));
            resultApi.setStatus(BasicApiConstant.SUCCEED.getStatus());
        } catch (Exception e) {
            resultApi.setStatus(BasicApiConstant.ERROR.getStatus());
            resultApi.setMessage(LoginStatus.ERROR.getStateDescription());
            log.error("Fail When Call AP: ", e);
        }
        return resultApi;
    }
    // Lấy workpaces Enable=true
    @GetMapping("/getEnableAllWorkSpaces")
    public ResponseObject<?> doGetEnableAllWorkSpaces(WorkspacesDto workspacesDto) {
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(workSpacesService.getAllEnableWorkspaces(workspacesDto));
            resultApi.setStatus(BasicApiConstant.SUCCEED.getStatus());
        } catch (Exception e) {
            resultApi.setStatus(BasicApiConstant.ERROR.getStatus());
            resultApi.setMessage(LoginStatus.ERROR.getStateDescription());
            log.error("Failed when calling API: ", e);
        }
        return resultApi;
    }
    // update khi name trùng, save khi name khác
    @PostMapping("/saveWorkSpaces")
    public ResponseObject<?> doPostSaveWorksPaces(@RequestBody WorkspacesDto workspacesDto) {
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(workSpacesService.saveWorkspace(workspacesDto));
            resultApi.setStatus(BasicApiConstant.SUCCEED.getStatus());
        } catch (Exception e) {
            resultApi.setStatus(BasicApiConstant.ERROR.getStatus());
            resultApi.setMessage(LoginStatus.ERROR.getStateDescription());
            log.error("Fail When Call AP: ", e);
        }
        return resultApi;
    }
    // xóa theo tên
    @DeleteMapping("/deleteWorkSpaces")
    public ResponseObject<?> doPostDeleteWorksPaces(@RequestBody WorkspacesDto workspacesDto) {
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(workSpacesService.deleteWorkspace(workspacesDto));
            resultApi.setStatus(BasicApiConstant.SUCCEED.getStatus());
        } catch (Exception e) {
            resultApi.setStatus(BasicApiConstant.ERROR.getStatus());
            resultApi.setMessage(LoginStatus.ERROR.getStateDescription());
            log.error("Fail When Call AP: ", e);
        }
        return resultApi;
    }
}
