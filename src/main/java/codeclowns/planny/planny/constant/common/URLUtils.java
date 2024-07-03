package codeclowns.planny.planny.constant.common;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

public class URLUtils {
    // Function to remove special characters from the input string
    public static String removeSpecialCharacters(String input) {
        // Replace all non-alphanumeric characters with an empty string
        return input.replaceAll("[^a-zA-Z0-9 ]", "").trim().toLowerCase();
    }

    // Function to encode the input string for URLs
    public static String encode(String input) {
        // Encode the input string using UTF-8 encoding scheme
        String encodedString = URLEncoder.encode(removeSpecialCharacters(input), StandardCharsets.UTF_8);
        // Replace '+' with '-' to meet your specific requirement
        return encodedString.replace("+", "-");
    }

    // Function to create a unique identifier
    public static String createUniqueIdentifier(String input) {
        // Encode the input string
        String encodedString = encode(input);
        // Generate a UUID
        String uuid = UUID.randomUUID().toString();
        // Combine the encoded string and the UUID to form a unique identifier
        return encodedString + "-" + uuid;
    }
}
