package codeclowns.planny.planny.mapper;

import codeclowns.planny.planny.data.dto.CardDTO;
import codeclowns.planny.planny.data.entity.CardE;
import codeclowns.planny.planny.repository.ListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomMapper {
    private final ListRepository listRepository;
    private final PasswordEncoder passwordEncoder;
    public CardE convertCardDTOToCardE(CardDTO cardDTO) {
        String randomUniqueString = String.valueOf(cardDTO.getCardId());
        if (cardDTO.getCardId() == null && cardDTO.getTitle() != null) {
            randomUniqueString = passwordEncoder.encode(cardDTO.getTitle()).substring(7);
        }
        return CardE.builder()
                .cardId(cardDTO.getCardId())
                .title(cardDTO.getTitle())
                .description(cardDTO.getDescription())
                .cover(cardDTO.getCover())
                .startDate(cardDTO.getStartDate())
                .dueDate(cardDTO.getDueDate())
                .isCompleted(cardDTO.getIsCompleted())
                .shortName(randomUniqueString)
                .slugUrl(randomUniqueString)
                .isEnabled(cardDTO.getIsEnabled())
                .ordinalNumber(cardDTO.getOrdinalNumber())
                .list(listRepository.findById(cardDTO.getListId()).orElseThrow())
                .cardConductorEList(null)
                .build();
    }
}
