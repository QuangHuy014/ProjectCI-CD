package codeclowns.planny.planny.api;

import codeclowns.planny.planny.constant.BasicApiConstant;
import codeclowns.planny.planny.data.dto.ListDto;
import codeclowns.planny.planny.data.mgt.ResponseObject;
import codeclowns.planny.planny.service.ListService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api-user/list")
@RequiredArgsConstructor
@Slf4j
public class ListApi {
    private final ListService listService;

    @SneakyThrows
    @GetMapping("/getAllListInBoard")
    public ResponseObject<?> doGetAllListInBoard(@RequestParam("slugUrl") String slugurl) {
        var response = new ResponseObject<>();
        var data = listService.getAllListsInBoard(slugurl);
        response.setData(data);
        response.setStatus(BasicApiConstant.SUCCEED.getStatus());
        response.setMessage("Lấy tất cả danh sách thành công!");
        return response;
    }

    @SneakyThrows
    @PostMapping("/save")
    public ResponseObject<?> doPostSave(@RequestBody ListDto listDto) {
        var response = new ResponseObject<>();
        var data = listService.save(listDto);
        response.setData(data);
        response.setMessage("Lưu danh sách thành công!");
        response.setStatus(BasicApiConstant.SUCCEED.getStatus());
        return response;
    }

    @SneakyThrows
    @PatchMapping("/arrange")
    public ResponseObject<?> doPatchArrangeList(@RequestBody List<ListDto> list) {
        var response = new ResponseObject<>();
        listService.arrange(list);
        response.setMessage("Sắp xếp danh sách thành công!");
        response.setStatus(BasicApiConstant.SUCCEED.getStatus());
        return response;
    }

    @SneakyThrows
    @PutMapping("/updateTitle")
    public ResponseObject<?> doPutUpdateTitle(@RequestBody ListDto listDto) {
        var response = new ResponseObject<>();
        var rowsEffected = listService.updateTitle(listDto);
        response.setData(rowsEffected);
        response.setMessage("Chỉnh sửa tiêu đề danh sách thành công!");
        response.setStatus(BasicApiConstant.SUCCEED.getStatus());
        return response;
    }

    @SneakyThrows
    @DeleteMapping("/disable")
    public ResponseObject<?> doPostDisableList(@RequestParam("listId") Integer listId) {
        var response = new ResponseObject<>();
        var rowsEffected = listService.disable(listId);
        response.setMessage("Xóa danh sách thành công!");
        response.setStatus(BasicApiConstant.SUCCEED.getStatus());
        response.setData(rowsEffected);
        return response;
    }
}
