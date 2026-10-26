package doctoral_school.post;

import doctoral_school.post.dto.v1.PostDTO;
import doctoral_school.postCategory.dto.v1.PostCategoryDTO;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {

    public PostDTO toPostDTO(Post post){
        PostCategoryDTO categoryDTO = null;
        if (post.getCategory() != null) {
            categoryDTO = new PostCategoryDTO(
                    post.getCategory().getPostCategoryId(),
                    post.getCategory().getName(),
                    post.getCategory().isDefault()
            );
        }

        return new PostDTO(
                post.getPostId(),
                post.getName(),
                post.getPostType(),
                post.getDescription(),
                post.getPaymentType(),
                categoryDTO,
                post.getUser() != null ? post.getUser().getEmail() : null,
                post.getUser() != null ?post.getUser().getTelephone() :null
        );
    }
}
