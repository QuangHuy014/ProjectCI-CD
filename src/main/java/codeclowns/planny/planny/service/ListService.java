package codeclowns.planny.planny.service;

import codeclowns.planny.planny.data.dto.ListDto;
import codeclowns.planny.planny.data.entity.ListE;
import codeclowns.planny.planny.exception.CustomException;

import java.util.List;

public interface ListService {
    List<ListE> getAllListsInBoard(String slugUrl) throws CustomException;
    Integer save(ListDto listDto) throws CustomException;
    Integer disable(Integer id) throws CustomException;
    Integer enable(Integer id);
    void arrange(List<ListDto> list) throws CustomException;
    Integer updateTitle(ListDto listDto) throws CustomException;
}
