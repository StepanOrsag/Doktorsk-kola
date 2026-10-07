package doctoral_school.user;

import doctoral_school.user.dto.v1.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserByID(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        userService.registration(userRegistrationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registrace proběhla úspěšně");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> loginUser(@RequestBody LoginRequestDTO loginRequestDTO){
        AuthResponseDTO response = userService.login(loginRequestDTO);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        userService.updateUser(id, userDTO);
        return ResponseEntity.ok("Data byla úspěšně aktualizována");
    }
}
