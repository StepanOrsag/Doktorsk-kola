package doctoral_school.post.dto.v1;

import doctoral_school.post.PaymentType;
import doctoral_school.post.PostType;
import doctoral_school.postCategory.dto.v1.PostCategoryDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private Long postId;
    private String name;
    private PostType postType;
    private String description;
    private PaymentType paymentType;
    private PostCategoryDTO category;
    private String email;
    private String phone;
}
