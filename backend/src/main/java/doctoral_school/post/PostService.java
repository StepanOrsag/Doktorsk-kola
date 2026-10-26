package doctoral_school.post;

import doctoral_school.post.dto.v1.PostDTO;
import doctoral_school.postCategory.PostCategory;
import doctoral_school.user.User;
import doctoral_school.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, PostMapper postMapper, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.userRepository = userRepository;
    }

    public PostDTO convertToDTO(Post post){return postMapper.toPostDTO(post);}

    public List<PostDTO> getAllPostsDTO() {
        return postRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public PostDTO getPostDTOById(Long postId){
        var post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Příspěvek nebyl nalezen"));
        return convertToDTO(post);
    }

    public PostDTO addPost(PostDTO postDTO, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Uživatel neexistuje"));
        Post post = new Post();
        post.setName(postDTO.getName());
        post.setDescription(postDTO.getDescription());
        
        if (postDTO.getCategory() != null) {
            PostCategory category = new PostCategory();
            category.setPostCategoryId(postDTO.getCategory().getPostCategoryId());
            post.setCategory(category);
        }

        post.setPostType(postDTO.getPostType());
        post.setPaymentType(postDTO.getPaymentType());
        post.setUser(user);

        Post newPost = postRepository.save(post);
        return convertToDTO(newPost);
    }
}
