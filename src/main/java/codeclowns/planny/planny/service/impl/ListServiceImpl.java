package codeclowns.planny.planny.service.impl;

import codeclowns.planny.planny.data.dto.ListDto;
import codeclowns.planny.planny.data.entity.ListE;
import codeclowns.planny.planny.exception.CustomCause;
import codeclowns.planny.planny.exception.CustomException;
import codeclowns.planny.planny.repository.BoardRepository;
import codeclowns.planny.planny.repository.ListRepository;
import codeclowns.planny.planny.service.BoardService;
import codeclowns.planny.planny.service.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ListServiceImpl implements ListService {
    private final ListRepository repo;
    private final BoardService boardService;
    private final BoardRepository boardRepo;
    private final ListRepository listRepository;

    @Override
    public List<ListE> getAllListsInBoard(String slugUrl) throws CustomException {
        var isBoardExisted = boardRepo.existsBySlugUrl(slugUrl);
        if (!isBoardExisted) {
            throw new CustomException(CustomCause.BOARD404);
        }
        return repo.findByBoard(slugUrl);
    }

    @Override
    public Integer save(ListDto listDto) throws CustomException {
        if (listDto.getListId() == null || !repo.existsById(listDto.getListId())) { // insert case
//            if (!isUniqueTitle(listDto)) {
//                throw new CustomException(CustomCause.DUPLICATE_TITLE);
//            }
            Integer ordinalNumber = repo.findMaxOrdinalBySlugUrl(listDto.getBoardSlugUrl());
            listDto.setOrdinalNumeral(ordinalNumber == null ? 1 : ordinalNumber + 1);
        }
        var listE = ListDto.convertListDtoToListE(listDto, boardService);
        var result = repo.save(listE);
        return result.getOrdinalNumeral();
    }

    @Override
    public Integer disable(Integer id) throws CustomException {
        return repo.disableList(id);
    }

    @Override
    public Integer enable(Integer id) {
        return 0;
    }

    @Override
    public void arrange(List<ListDto> list) throws CustomException {
        for (ListDto listDto : list) {
            var result = listRepository.executeQuery(listDto.getOrdinalNumeral(), listDto.getListId());
//            System.out.println(result);
        }
    }

    @Override
    public Integer updateTitle(ListDto listDto) throws CustomException {
        return repo.updateTitle(listDto.getTitle(), listDto.getListId());
    }

    private List<String> generateUpdateQueries(List<ListDto> list) {
        List<String> queries = new ArrayList<>();
        for (ListDto listDto : list) {
            queries.add("update List " +
                    "set ordinal_numeral = " + listDto.getOrdinalNumeral() +
                    " where list_id = " + listDto.getListId());
        }
        return queries;
    }

    private boolean isUniqueTitle(ListDto listDto) {
        return repo.getDuplicateTitleCount(listDto.getBoardSlugUrl(), listDto.getTitle()) == 0;
    }
}