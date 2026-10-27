package doctoral_school.post;

import doctoral_school.post.dto.v1.PostDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/posts")
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
    public PostDTO addPost(@RequestBody PostDTO postDTO, Principal principal){
        return postService.addPost(postDTO, principal.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, Principal principal){
        postService.deletePost(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
