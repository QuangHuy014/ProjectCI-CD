package codeclowns.planny.planny.service;

import codeclowns.planny.planny.data.entity.MemberE;
import java.util.List;

public interface MemberService {
    List<MemberE> doGetChiTietMember(Integer boardId);
    List<MemberE> getMembersByWorkspaceId(Integer workspaceId);

}
