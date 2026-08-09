package doctoral_school.postCategory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Categories")
public class PostCategoryController {

    private PostCategoryRepository postCategoryRepository;

    public PostCategoryController(PostCategoryRepository postCategoryRepository) {
        this.postCategoryRepository = postCategoryRepository;
    }

    @GetMapping
    public List<PostCategory> getAllCategories(){
        return postCategoryRepository.findAll();
    }
}
