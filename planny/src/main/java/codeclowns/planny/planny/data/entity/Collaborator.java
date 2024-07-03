package codeclowns.planny.planny.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Collaborator")
public class Collaborator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collaborator_id")
    private Integer collaboratorId;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "username", unique = true, length = 63)
    private String username;

    @Column(name = "email", unique = true, length = 63)
    private String email;

    @Column(name = "fullname", length = 63)
    private String fullname;

    @Column(name = "avatar", length = 127)
    private String avatar;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "user_id", nullable = false)
    private UserE user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "workspace_id", nullable = false)
    private WorkSpaceE workSpace;
}
