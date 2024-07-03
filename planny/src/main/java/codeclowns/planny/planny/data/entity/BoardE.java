package codeclowns.planny.planny.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
@Table(name = "Board", uniqueConstraints = {
        @UniqueConstraint(name = "unique_board_short_name", columnNames = "short_name"),
        @UniqueConstraint(name = "unique_board_slug_url", columnNames = "slug_url")
})
public class BoardE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Integer boardId;
    @Column(name = "board_name", length = 63, nullable = false)
    private String boardName;
    @Column(name = "short_name", length = 63, unique = true)
    private String shortName;
    @Column(name = "slug_url", length = 63, unique = true)
    private String slugUrl;
    @Column(name = "visibility", length = 63)
    private String visibility;
    @Column(name = "is_enabled", nullable = false)
    private Boolean isEnabled=true;

//    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "workspace_id", nullable = false)
    private WorkSpaceE workSpace;

//    @JsonIgnore
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<ListE> list;

    @JsonIgnore
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<MemberE> member;


}
