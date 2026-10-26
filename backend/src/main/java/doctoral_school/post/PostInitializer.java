package doctoral_school.post;

import doctoral_school.postCategory.PostCategory;
import doctoral_school.postCategory.PostCategoryRepository;
import doctoral_school.user.User;
import doctoral_school.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.util.List;

@Configuration
public class PostInitializer {

    @Bean
    @Order(3)
    CommandLineRunner initPosts(PostRepository postRepository, PostCategoryRepository categoryRepository, UserRepository userRepository) {
        return args -> {
            if (postRepository.count() == 0) {
                PostCategory programming = categoryRepository.findAll().stream()
                        .filter(c -> "Programování".equals(c.getName()))
                        .findFirst()
                        .orElse(null);

                PostCategory languages = categoryRepository.findAll().stream()
                        .filter(c -> "Studium jazyka".equals(c.getName()))
                        .findFirst()
                        .orElse(null);

                PostCategory metodology = categoryRepository.findAll().stream()
                        .filter(c -> "Metodologie".equals(c.getName()))
                        .findFirst()
                        .orElse(null);

                User testUser = userRepository.findAll().stream().findFirst().orElse(null);

                postRepository.saveAll(List.of(
                        new Post(
                                null,
                                "Hledám pomoc s programováním",
                                PostType.SEEKHELP,
                                "Hledám pomoc s programovacím jazykem Java pro komerční účely.",
                                PaymentType.FREE,
                                programming,
                                testUser
                        ),

                        new Post(
                                null,
                                "Nabízím pomoc se studií jazyka",
                                PostType.OFFERHELP,
                                "Nabízím odbornou pomoc s angličtinou, němčinou a japonštinou",
                                PaymentType.PAID,
                                languages,
                                testUser
                        ),

                        new Post(
                                null,
                                "Hledám spolupráci na výzkumu rychlosti algoritmů.",
                                PostType.OFFERCOLLABORATION,
                                "Hledám kolegu na spolupráci při hodnocení rychlosti algoritmů v různých systémech",
                                PaymentType.AGREEMENT,
                                metodology,
                                testUser
                        )
                ));
            }
        };
    }
}
