package codeclowns.planny.planny.repository;

import codeclowns.planny.planny.data.entity.AccountE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<AccountE, Integer> {
    AccountE findByEmailOrUsername(String email, String username);

    @Procedure(name = "InsertAccountAndUser")
    void insertAccountAndUser(String username, String password, String email, String sub, Boolean isEnabled, String fullName);

    AccountE findAccountByUsernameOrEmailAndIsEnabledTrue(String username, String email);
    Optional<AccountE> findByUsername(String username);
}