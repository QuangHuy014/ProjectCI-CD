package codeclowns.planny.planny.service.impl;

import codeclowns.planny.planny.data.entity.MemberE;
import codeclowns.planny.planny.repository.MemberRepository;
import codeclowns.planny.planny.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    final MemberRepository memberRepository;

    @Override
    public List<MemberE> doGetChiTietMember(Integer boardId) {
        var memberEList = memberRepository.findMemberEByBoard(boardId);
        if(Objects.nonNull(memberEList)){
            return memberEList;
        }
        return null;
    }

    @Override
    public List<MemberE> getMembersByWorkspaceId(Integer workspaceId) {
        var memberEList = memberRepository.findMembersByWorkspaceId(workspaceId);
        if(Objects.nonNull(memberEList)){
            return memberEList;
        }
        return null;
    }
}
