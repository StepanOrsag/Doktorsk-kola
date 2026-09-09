package doctoral_school.postCategory;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.util.List;

@Configuration
public class PostCategoryInitializer {

    @Bean
    @Order(1)
    CommandLineRunner initCategories(PostCategoryRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                        new PostCategory(null, "Statistika", true),
                        new PostCategory(null, "AI", true),
                        new PostCategory(null, "Metodologie", true),
                        new PostCategory(null, "Publikování", true),
                        new PostCategory(null, "Programování", true),
                        new PostCategory(null, "Studium jazyka", true),
                        new PostCategory(null, "Laboratoře", true),
                        new PostCategory(null, "Grafika", true)
                ));
            }
        };
    }
}
