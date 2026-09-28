package doctoral_school.postCategory;

import doctoral_school.postCategory.dto.v1.PostCategoryDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Categories")
public class PostCategoryController {

    private PostCategoryService postCategoryService;

    public PostCategoryController(PostCategoryService postCategoryService) {
        this.postCategoryService = postCategoryService;
    }

    @GetMapping
    public List<PostCategoryDTO> getAllCategories(){
        return postCategoryService.getAllPostCategoriesDTO();
    }
}
