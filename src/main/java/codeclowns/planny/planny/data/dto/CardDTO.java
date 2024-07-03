package codeclowns.planny.planny.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardDTO {
    private Integer cardId;
    private String title;
    private String description;
    private String cover;
    private Date startDate;
    private Date dueDate;
    private Boolean isCompleted;
    private Integer ordinalNumber;
    private Boolean isEnabled = true;
    private Integer listId;
    private List<CardConductorDTO> conductors;
}
