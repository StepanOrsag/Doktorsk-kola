package doctoral_school.user;

import doctoral_school.Auth.PasswordHashingService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class UserInit {

    @Bean
    @Order(2)
    CommandLineRunner init(UserRepository userRepository, PasswordHashingService passwordHashingService) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.saveAll(List.of(
                        new User(
                                null,
                                passwordHashingService.hash("heslo123"),
                                "Jan",
                                "Novák",
                                "jan.novak@uhk.cz",
                                "+420123456789"
                        ),
                        new User(
                                null,
                                passwordHashingService.hash("heslo123"),
                                "Petr",
                                "Svoboda",
                                "petr.svoboda@upce.cz",
                                "+420987654321"
                        )
                ));
            }
        };
    }
}