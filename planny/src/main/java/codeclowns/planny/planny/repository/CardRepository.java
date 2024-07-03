package codeclowns.planny.planny.repository;

import codeclowns.planny.planny.data.entity.CardE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<CardE, Integer> {
    @Query("select c " +
            "from CardE c " +
            "where c.list.listId = :listId " +
            "and c.isEnabled = true " +
            "order by c.ordinalNumber asc ")
    List<CardE> findCardsInList(@Param("listId") Integer listId);

    CardE save(CardE e);

    @Query("select max(c.ordinalNumber) " +
            "from CardE c " +
            "where c.list.listId = :listId")
    Integer findMaxOrdinalByListId(@Param("listId") Integer listId);

    @Modifying
    @Transactional
    @Query(value = "update Card " +
            "set ordinal_number = :ordinalNumber " +
            ", list_id = :listId " +
            "where card_id = :cardId", nativeQuery = true)
    Integer updateCardOrdinalNumber(@Param("ordinalNumber") Integer ordinalNumber
            , @Param("listId") Integer listId
            , @Param("cardId") Integer cardId);

//    @Modifying
//    @Transactional
//    @Query(value = "update CardE c " +
//            "set c.isEnabled = false " +
//            ", c.ordinalNumber = -1 " +
//            "where c.listId = :listId")
//    Integer disableList(@Param("listId") Integer listId);

//    @Modifying
//    @Transactional
//    @Query(value = "update CardE c " +
//            "set c.title = :title " +
//            "where c.listId = :listId")
//    Integer updateTitle(@Param("title") String title
//            , @Param("listId") Integer listId);
}