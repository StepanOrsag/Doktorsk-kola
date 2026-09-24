package doctoral_school.post;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long postId){
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Příspěvek nebyl nalezen"));
    }

    public Post addPost(Post post) {
        return postRepository.save(post);
    }
}
