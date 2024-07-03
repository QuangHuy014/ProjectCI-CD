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
@Table(name = "Account", uniqueConstraints = {
        @UniqueConstraint(name = "unique_account_email_sub", columnNames = {"email", "sub"}),
        @UniqueConstraint(name = "unique_account_username", columnNames = "username")
})
public class AccountE {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Integer accountId;

    @Column(name = "username", length = 63, unique = true)
    private String username;

    @Column(name = "email", length = 63)
    private String email;

    @Column(name = "sub", length = 63)
    private String sub;

    @Column(name = "password", length = 127, nullable = false)
    @JsonIgnore
    private String password;

    @Column(name = "is_enabled", nullable = false)
    private Boolean isEnabled = true;

    @OneToOne(mappedBy = "account")
    private UserE user;
}