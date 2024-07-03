package codeclowns.planny.planny.service;

import codeclowns.planny.planny.data.dto.BoardDto;
import codeclowns.planny.planny.data.entity.BoardE;
import java.util.List;

public interface BoardService {
    List<BoardE> getAllEnabledBoard(BoardDto boardDto) throws Exception;
    BoardE saveBoard(BoardDto boardDto ) throws Exception;
    List<BoardE> doGetBoardByWorkSpace(Integer workSpace_Id) throws Exception;

    List<Object[]> findBoardWithMembersInWorkspace(Integer workspaceId) throws Exception;

    BoardE getBoardBySlugUrl(String slugUrl);
}
