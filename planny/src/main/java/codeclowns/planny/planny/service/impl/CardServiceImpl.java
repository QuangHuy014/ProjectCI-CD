package codeclowns.planny.planny.service.impl;

import codeclowns.planny.planny.data.dto.CardDTO;
import codeclowns.planny.planny.data.entity.CardE;
import codeclowns.planny.planny.exception.CustomException;
import codeclowns.planny.planny.mapper.CustomMapper;
import codeclowns.planny.planny.repository.CardRepository;
import codeclowns.planny.planny.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {
    private final CardRepository cardRepository;
    private final CustomMapper customMapper;

    @Override
    public List<CardE> getAllCardsInList(Integer listId) throws CustomException {
        return cardRepository.findCardsInList(listId);
    }

    @Override
    public Integer save(CardDTO cardDTO) throws CustomException {
        if (cardDTO.getCardId() == null || !cardRepository.existsById(cardDTO.getCardId())) {
            Integer stt = cardRepository.findMaxOrdinalByListId(cardDTO.getListId());
            cardDTO.setOrdinalNumber(stt == null ? 1 : stt + 1);
            System.out.println("stt >> " + stt + " >> " + cardDTO.getOrdinalNumber());
        }
        var cardE = customMapper.convertCardDTOToCardE(cardDTO);
        var result = cardRepository.save(cardE);
        return result.getOrdinalNumber();
    }

    @Override
    public void arrange(List<CardDTO> list) throws CustomException {
        for (CardDTO cardDTO : list) {
            var result = cardRepository.updateCardOrdinalNumber
                    (
                            cardDTO.getOrdinalNumber()
                            , cardDTO.getListId()
                            , cardDTO.getCardId()
                    );
            System.out.println(this.getClass().getSimpleName() + " >> " + result);
        }
    }
}