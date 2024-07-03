package codeclowns.planny.planny.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Workspace")
@JsonIgnoreProperties({"user", "danhSachCollaborators", "danhSachBoard"})
public class WorkSpaceE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workspace_id")
    private Integer workspaceId;

    @Column(name = "workspace_name", nullable = false)
    private String workspaceName;

    @Column(name = "short_name", unique = true, length = 63)
    private String shortName;

    @Column(name = "website", length = 128)
    private String website;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "is_enabled")
    private Boolean isEnabled = true;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "user_id", nullable = false)
    private UserE user;

    @OneToMany(mappedBy = "workSpace", fetch = FetchType.EAGER, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    private List<Collaborator> danhSachCollaborators;

    @OneToMany(mappedBy = "workSpace", fetch = FetchType.EAGER, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    private List<BoardE> danhSachBoard;
}
