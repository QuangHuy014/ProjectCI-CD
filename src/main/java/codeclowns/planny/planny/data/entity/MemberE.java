package codeclowns.planny.planny.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="Member",uniqueConstraints ={
        @UniqueConstraint(name="unique_member_username", columnNames = "username"),
        @UniqueConstraint(name="unique_member_email", columnNames = "email")
})
public class MemberE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Integer memberId;
    @Column(name="role", length=63, nullable=false)
    private String role;
    @Column(name="username", length=63, unique = true)
    private String username;
    @Column(name="email", length=63, unique = true)
    private String email;
    @Column(name="avatar",length = 127)
    private String avatar;
    @Column(name="fullname", length = 63)
    private String fullName;
    @Column(name = "is_enabled")
    private Boolean isEnabled; // Nghia fix isEnable

    @ManyToOne(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "user_id", nullable = false)
//    @JsonIgnore
    private UserE user;

    @OneToMany(mappedBy = "member", cascade = {
            CascadeType.ALL,
    })
    private List<CardConductorE> cardConductorEList;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "board_id", nullable = false)
    @JsonIgnore
    private BoardE board;

}
