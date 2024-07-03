package codeclowns.planny.planny.api;

import codeclowns.planny.planny.constant.BasicApiConstant;
import codeclowns.planny.planny.constant.LoginStatus;
import codeclowns.planny.planny.data.dto.BoardDto;
import codeclowns.planny.planny.data.entity.BoardE;
import codeclowns.planny.planny.data.mgt.ResponseObject;
import codeclowns.planny.planny.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api-public/board")
public class BoardApi {

    private final BoardService boardService;

    @GetMapping("/getEnableAllBoard")
    public ResponseObject<?> doGetEnableAllBoard(BoardDto boardDto) {
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(boardService.getAllEnabledBoard(boardDto));
            resultApi.setStatus(BasicApiConstant.SUCCEED.getStatus());
        } catch (Exception e) {
            resultApi.setStatus(BasicApiConstant.ERROR.getStatus());
            resultApi.setMessage(LoginStatus.ERROR.getStateDescription());
            log.error("Failed when calling API: ", e);
        }
        return resultApi;
    }
    @PostMapping("/saveAllBoard")
    public ResponseEntity<ResponseObject<?>> saveAllBoard(@RequestBody BoardDto boardDto) {
        var resultApi = new ResponseObject<>();
        try {
            log.debug("Received BoardDto: {}", boardDto);
            BoardE savedBoard = boardService.saveBoard(boardDto);
            resultApi.setData(savedBoard);
            resultApi.setStatus(BasicApiConstant.SUCCEED.getStatus());
            return ResponseEntity.ok(resultApi);
        } catch (Exception e) {
            resultApi.setStatus(BasicApiConstant.ERROR.getStatus());
            resultApi.setMessage(LoginStatus.ERROR.getStateDescription());
            log.error("Failed when calling API: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultApi);
        }
    }

    @GetMapping("/getInformationBoard")
    public ResponseObject<?> getInformationWorkSpaceByBoard(@RequestParam Integer workspaceId){
        var resultApi=new ResponseObject<>();
        try {
            resultApi.setData(boardService.doGetBoardByWorkSpace(workspaceId));
            resultApi.setStatus("success");
            resultApi.setMessage("success");
        } catch (Exception e){
            resultApi.setStatus(BasicApiConstant.FAILED.getStatus());
            resultApi.setMessage(BasicApiConstant.ERROR.getStatus());
            log.error("Fail when call api /api-public/board/getInformationBoard",e);
        }
      return resultApi;
    }

     @GetMapping("/getBoardsByWorkspace")
    public ResponseObject<?> getBoardsByWorkspace(@RequestParam Integer workspaceId){
        var resultApi = new ResponseObject<>();
        try {
            // Gọi phương thức service để lấy danh sách các bảng trong workspace
            resultApi.setData(boardService.findBoardWithMembersInWorkspace(workspaceId));
            resultApi.setStatus("success");
            resultApi.setMessage("Successfully retrieved boards for workspace with id: " + workspaceId);
        } catch (Exception e){
            // Xử lý nếu có lỗi xảy ra
            resultApi.setStatus(BasicApiConstant.FAILED.getStatus());
            resultApi.setMessage("Failed to retrieve boards for workspace with id: " + workspaceId);
            log.error("Failed when calling API /api-public/board/getBoardsByWorkspace", e);
        }
        return resultApi;
    }

    @GetMapping("/getBoardBySLugUrl")
    public ResponseObject<?> doGetBoardBySlugUrl(@RequestParam String slugUrl) {
        var resultApi = new ResponseObject<>();
        var board = boardService.getBoardBySlugUrl(slugUrl);
        resultApi.setData(board);
        resultApi.setStatus("success");
        resultApi.setMessage("Get board successfully");
        return resultApi;
    }
}
