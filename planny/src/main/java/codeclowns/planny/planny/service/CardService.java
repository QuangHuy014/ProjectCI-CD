package codeclowns.planny.planny.service;

import codeclowns.planny.planny.data.dto.CardDTO;
import codeclowns.planny.planny.data.entity.CardE;
import codeclowns.planny.planny.exception.CustomException;

import java.util.List;

public interface CardService {
    List<CardE> getAllCardsInList(Integer listId) throws CustomException;

    Integer save(CardDTO cardDTO) throws CustomException;

    //    Integer disable(Integer id) throws CustomException;
//    Integer enable(Integer id);
    void arrange(List<CardDTO> list) throws CustomException;
//    Integer updateTitle(CardDTO listDto) throws CustomException;
}
