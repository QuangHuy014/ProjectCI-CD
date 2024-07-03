package codeclowns.planny.planny.exception;

import codeclowns.planny.planny.data.mgt.ResponseObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLException;

@ControllerAdvice
public class CustomExceptionHandler {
    public static final Logger log = LoggerFactory.getLogger(CustomExceptionHandler.class);

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException e) {
        var response = new ResponseObject<>();
        response.setStatus(e.getCustomCause().toString());
        response.setMessage(e.getMessage());
//        log.warn(e.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<?> handleSQLException(SQLException e) {
        var response = new ResponseObject<>();
        response.setStatus(e.getSQLState());
        response.setMessage(e.getMessage());
//        log.warn(e.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<?> handleNullPointerException(NullPointerException e) {
        var response = new ResponseObject<>();
        response.setStatus(null);
        response.setMessage(e.getMessage());
//        log.warn(e.getMessage());
        return ResponseEntity.badRequest().body(response);
    }
}
