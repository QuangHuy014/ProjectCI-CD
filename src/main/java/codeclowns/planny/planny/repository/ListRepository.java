package codeclowns.planny.planny.repository;

import codeclowns.planny.planny.data.entity.ListE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ListRepository extends JpaRepository<ListE, Integer> {
    @Query("select l " +
            "from ListE l " +
            "where l.board.slugUrl = :slugUrl " +
            "and l.isEnabled = true " +
            "order by l.ordinalNumeral asc ")
    List<ListE> findByBoard(@Param("slugUrl") String slugUrl);

    ListE save(ListE e);

    @Query("select max(l.ordinalNumeral) " +
            "from ListE l " +
            "where l.board.slugUrl = :slugUrl")
    Integer findMaxOrdinalBySlugUrl(@Param("slugUrl") String slugUrl);

    @Query("select count(l) " +
            "from ListE l " +
            "where l.board.slugUrl = :slugUrl " +
            "and l.title = :title")
    Integer getDuplicateTitleCount(@Param("slugUrl") String slugUrl, @Param("title") String title);

    @Modifying
    @Transactional
    @Query(value = "update ListE l " +
            "set l.ordinalNumeral = :ordinalNumeral " +
            "where l.listId = :listId")
    Integer executeQuery(@Param("ordinalNumeral") Integer ordinalNumeral,
                         @Param("listId") Integer listId);

    @Modifying
    @Transactional
    @Query(value = "update ListE l " +
            "set l.isEnabled = false " +
            ", l.ordinalNumeral = -1 " +
            "where l.listId = :listId")
    Integer disableList(@Param("listId") Integer listId);

    @Modifying
    @Transactional
    @Query(value = "update ListE l " +
            "set l.title = :title " +
            "where l.listId = :listId")
    Integer updateTitle(@Param("title") String title
            ,@Param("listId") Integer listId);
}