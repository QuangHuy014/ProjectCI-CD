package codeclowns.planny.planny.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "List")
public class ListE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "list_id")
    private Integer listId;

    @Column(name = "title", nullable = false, length = 63)
    private String title;

    @Column(name = "ordinal_numeral", nullable = false)
    private Integer ordinalNumeral;

    @Column(name = "is_enabled", nullable = false, columnDefinition = "bit default 1")
    private Boolean isEnabled = true;

    @OneToMany(mappedBy = "list", cascade = {
            CascadeType.ALL,
    })
    private List<CardE> cardEList;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "board_id", nullable = false)
    @JsonIgnore
    private BoardE board;
}
