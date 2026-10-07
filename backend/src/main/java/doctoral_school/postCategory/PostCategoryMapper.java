package doctoral_school.postCategory;

import doctoral_school.postCategory.dto.v1.PostCategoryDTO;
import org.springframework.stereotype.Component;

@Component
public class PostCategoryMapper {
    public PostCategoryDTO toPostCategoryDTO(PostCategory postCategory) {
        return new PostCategoryDTO(
                postCategory.getPostCategoryId(),
                postCategory.getName(),
                postCategory.isDefault()
        );
    }
}
