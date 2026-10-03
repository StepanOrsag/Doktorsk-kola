package doctoral_school.user;

import doctoral_school.Auth.PasswordHashingService;
import doctoral_school.post.PostMapper;
import doctoral_school.user.dto.v1.UserDTO;
import doctoral_school.user.dto.v1.UserRegistrationDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordHashingService passwordHashingService;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, PasswordHashingService passwordHashingService, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordHashingService = passwordHashingService;
        this.userMapper = userMapper;
    }

    public UserDTO convertToDto(User user) {return userMapper.toUserDTO(user);}

   public UserDTO getUserById(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new IllegalArgumentException("Uživatel s id " + userId + " nebyl nalezen."));
        return convertToDto(user);
   }

    @Transactional
    public void registration(UserRegistrationDTO userRegistrationDTO) {
        String email = userRegistrationDTO.getEmail();

        if(email == null || (!email.endsWith("@uhk.cz") && email.endsWith("@upce.cz"))){
            throw new IllegalArgumentException("Registrace je povolena pouze pro e-maily z domén @uhk.cz nebo @upce.cz");
        }
        if(userRepository.existsByEmail(userRegistrationDTO.getEmail())){
           throw new IllegalArgumentException("Tento e-mail je již zaregistrován");
        }
        User user = new User();
        user.setEmail(userRegistrationDTO.getEmail());
        user.setPasswordHash(passwordHashingService.hash(userRegistrationDTO.getPassword()));

        userRepository.save(user);
    }

    @Transactional
    public void updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElse(null);
        if(!user.getEmail().equals(userDTO.getEmail())){
            throw new IllegalArgumentException("Email změnit nelze");
        }

        userRepository.save(user);
    }
}
