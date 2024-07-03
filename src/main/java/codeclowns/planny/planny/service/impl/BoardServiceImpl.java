package codeclowns.planny.planny.service.impl;

import codeclowns.planny.planny.data.dto.BoardDto;
import codeclowns.planny.planny.data.entity.AccountE;
import codeclowns.planny.planny.data.entity.BoardE;
import codeclowns.planny.planny.data.entity.ListE;
import codeclowns.planny.planny.data.entity.WorkSpaceE;
import codeclowns.planny.planny.exception.CustomCause;
import codeclowns.planny.planny.exception.CustomException;
import codeclowns.planny.planny.repository.BoardRepository;
import codeclowns.planny.planny.repository.ListRepository;
import codeclowns.planny.planny.repository.WorkSpacesRepository;
import codeclowns.planny.planny.security.service.AuthService;
import codeclowns.planny.planny.service.BoardService;
import codeclowns.planny.planny.service.CardService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final WorkSpacesRepository workSpaceRepository;
    private final AuthService authService;
    private final ListRepository listRepository;
    final CardService cardService;

    public List<BoardE> getAllEnabledBoard(BoardDto boardDto) throws Exception {
        AccountE currentAccount = authService.getCurrentUser();
        if (currentAccount == null) {
            throw new IllegalStateException("User not logged in or session expired");
        }
        Long userId = Long.valueOf(currentAccount.getAccountId());
        return boardRepository.findAllByWorkSpaceUserIdAndWorkSpaceIsEnabledTrueAndIsEnabledTrue(userId);
    }


    @Override
    @Transactional
    public BoardE saveBoard(BoardDto boardDto) throws Exception {
        BoardE boardEntity = convertToEntity(boardDto);
        BoardE savedBoard = boardRepository.save(boardEntity);
        return savedBoard;
    }

    private BoardE convertToEntity(BoardDto dto) throws Exception {
        Integer workSpaceId = dto.getWorkSpaceId();
        if (workSpaceId == null) {
            throw new Exception("WorkSpaceId is null in BoardDto");
        }
        WorkSpaceE workSpace = workSpaceRepository.findById(workSpaceId)
                .orElseThrow(() -> new Exception("WorkSpace not found with id: " + workSpaceId));
        return BoardE.builder()
                .boardName(dto.getBoardName())
                .shortName(dto.getShortName())
                .slugUrl(dto.getSlugUrl())
                .visibility(dto.getVisibility())
                .isEnabled(dto.getIsEnabled())
                .workSpace(workSpace)
                .build();
    }

    @Override
    public List<BoardE> doGetBoardByWorkSpace(Integer workSpace_Id) throws Exception {
        var listResultEntity = boardRepository.findBoardByWorkSpace(workSpace_Id);
        if (Objects.nonNull(listResultEntity)) {
            return listResultEntity;
        }
        return null;
    }

    @Override
    public List<Object[]> findBoardWithMembersInWorkspace(Integer workspaceId) throws Exception {
        var listResultEntity = boardRepository.findBoardWithMembersInWorkspace(workspaceId);
        if (Objects.nonNull(listResultEntity)) {
            return listResultEntity;
        }
        return null;
    }

    @SneakyThrows
    @Override
    public BoardE getBoardBySlugUrl(String slugUrl) {
        var board = boardRepository.findBySlugUrl(slugUrl);
        if (board == null) throw new CustomException(CustomCause.BOARD404);
        var currentUser = authService.getCurrentUser();
        var isMember = false;
        for (var mem : board.getMember()) {
            var user = mem.getUser();
            System.out.println(">>member: " + user.getUserName() + " >> " + currentUser.getUsername());
            if (currentUser.getAccountId().equals(user.getId())) {
                isMember = true;
                break;
            }
        }
        if (!isMember) throw new CustomException(CustomCause.UNAUTHORIZED_MEMBER);
        board.setList(listRepository.findByBoard(slugUrl));
        var list = board.getList();
        for (ListE listE : list) {
            listE.setCardEList(cardService.getAllCardsInList(listE.getListId()));
        }
        return board;
    }
}
