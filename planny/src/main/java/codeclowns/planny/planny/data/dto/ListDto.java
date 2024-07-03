package codeclowns.planny.planny.data.dto;

import codeclowns.planny.planny.data.entity.ListE;
import codeclowns.planny.planny.exception.CustomException;
import codeclowns.planny.planny.service.BoardService;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListDto {
    private Integer listId;
    private String title;
    private int ordinalNumeral;
    private String boardSlugUrl;
    private Boolean isEnabled = true;

    public static ListE convertListDtoToListE(ListDto listDto, BoardService boardService) throws CustomException {
        return ListE.builder()
                .listId(listDto.getListId())
                .title(listDto.getTitle())
                .ordinalNumeral(listDto.getOrdinalNumeral())
                .board(boardService.getBoardBySlugUrl(listDto.getBoardSlugUrl()))
                .isEnabled(listDto.getIsEnabled())
                .build();
    }
}
