package codeclowns.planny.planny.api;

import codeclowns.planny.planny.constant.BasicApiConstant;
import codeclowns.planny.planny.data.dto.CardDTO;
import codeclowns.planny.planny.data.mgt.ResponseObject;
import codeclowns.planny.planny.service.CardService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api-user/card")
@RequiredArgsConstructor
public class CardApi {
    private final CardService cardService;

    @SneakyThrows
    @PostMapping("/save")
    public ResponseObject<?> doPostSave(@RequestBody CardDTO cardDTO) {
        var response = new ResponseObject<>();
        var data = cardService.save(cardDTO);
        response.setData(data);
        response.setMessage("Lưu thẻ thành công!");
        response.setStatus(BasicApiConstant.SUCCEED.getStatus());
        return response;
    }
    @SneakyThrows
    @PatchMapping("/arrange")
    public ResponseObject<?> doPatchArrangeList(@RequestBody List<CardDTO> list) {
        var response = new ResponseObject<>();
        cardService.arrange(list);
        response.setMessage("Sắp xếp thẻ thành công!");
        response.setStatus(BasicApiConstant.SUCCEED.getStatus());
        return response;
    }
}
