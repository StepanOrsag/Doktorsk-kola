package doctoral_school.Auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class PasswordHashingService {
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public String hash(String rawPassword) { return passwordEncoder.encode(rawPassword); }

    public boolean matches(String rawPassword, String expectedHash) {
        return passwordEncoder.matches(rawPassword, expectedHash);
    }
}
