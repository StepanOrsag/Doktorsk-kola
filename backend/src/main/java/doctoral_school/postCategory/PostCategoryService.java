package doctoral_school.postCategory;

import doctoral_school.postCategory.dto.v1.PostCategoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostCategoryService {
    private final PostCategoryRepository postCategoryRepository;
    private final PostCategoryMapper mapper;

    public PostCategoryService(PostCategoryRepository postCategoryRepository, PostCategoryMapper mapper) {
        this.postCategoryRepository = postCategoryRepository;
        this.mapper = mapper;
    }

    public PostCategoryDTO convertToDto(PostCategory postCategory){return mapper.toPostCategoryDTO(postCategory);}

    public List<PostCategoryDTO> getAllPostCategoriesDTO(){
        return postCategoryRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .toList();
    }
}
