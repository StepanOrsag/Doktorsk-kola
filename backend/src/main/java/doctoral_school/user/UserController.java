package doctoral_school.user;

import doctoral_school.user.dto.v1.UserDTO;
import doctoral_school.user.dto.v1.UserRegistrationDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserDTO getUserByID(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        userService.registration(userRegistrationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registrace proběhla úspěšně");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        userService.updateUser(id, userDTO);
        return ResponseEntity.ok("Data byla úspěšně aktualizována");
    }
}
