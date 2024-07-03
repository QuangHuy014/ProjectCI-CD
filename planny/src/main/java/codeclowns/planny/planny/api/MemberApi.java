package codeclowns.planny.planny.api;

import codeclowns.planny.planny.constant.BasicApiConstant;
import codeclowns.planny.planny.data.mgt.ResponseObject;
import codeclowns.planny.planny.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api-public/member")
public class MemberApi {

    final MemberService memberService;

    @GetMapping("/getInformationMember")
    public ResponseObject<?> getInformationmember(@RequestParam Integer boardId ){
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(memberService.doGetChiTietMember(boardId));
             resultApi.setStatus("success");
            resultApi.setMessage("success");
        }catch (Exception e){
             resultApi.setStatus(BasicApiConstant.FAILED.getStatus());
            resultApi.setMessage(BasicApiConstant.ERROR.getStatus());
            log.error("Fail when call api /api-public/member/getInformationMember",e);
        }
        return resultApi;
    }

    @GetMapping("/getByworkspace")
    public ResponseObject<?> getMemberByWorkSpace(@RequestParam Integer workspaceId ){
        var resultApi = new ResponseObject<>();
        try {
            resultApi.setData(memberService.getMembersByWorkspaceId(workspaceId));
             resultApi.setStatus("success");
            resultApi.setMessage("success");
        }catch (Exception e){
             resultApi.setStatus(BasicApiConstant.FAILED.getStatus());
            resultApi.setMessage(BasicApiConstant.ERROR.getStatus());
            log.error("Fail when call api /api-public/member/getByworkspace",e);
        }
        return resultApi;
    }
}
