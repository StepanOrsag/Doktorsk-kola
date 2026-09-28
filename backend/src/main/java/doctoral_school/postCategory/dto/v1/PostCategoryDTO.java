package doctoral_school.postCategory.dto.v1;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCategoryDTO {
    private Long postCategoryId;
    private String name;
    private boolean isDefault;
}
