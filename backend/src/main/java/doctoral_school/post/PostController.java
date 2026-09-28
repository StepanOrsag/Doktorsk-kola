package doctoral_school.post;

import doctoral_school.post.dto.v1.PostDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Posts")
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostDTO> getAllPosts(){
        return postService.getAllPostsDTO();
    }

    @GetMapping("/{id}")
    public PostDTO getPostById(@PathVariable Long id){
        return postService.getPostDTOById(id);
    }

    @PostMapping
    public PostDTO addPost(@RequestBody PostDTO postDTO){
        return postService.addPost(postDTO);
    }
}
