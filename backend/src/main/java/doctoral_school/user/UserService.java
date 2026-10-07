package doctoral_school.user;

import doctoral_school.Auth.JwtService;
import doctoral_school.Auth.PasswordHashingService;
import doctoral_school.post.PostMapper;
import doctoral_school.user.dto.v1.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordHashingService passwordHashingService;
    private final UserMapper userMapper;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordHashingService passwordHashingService, UserMapper userMapper, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordHashingService = passwordHashingService;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
    }

    public UserDTO convertToDto(User user) {return userMapper.toUserDTO(user);}

   public UserDTO getUserById(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new IllegalArgumentException("Uživatel s id " + userId + " nebyl nalezen."));
        return convertToDto(user);
   }

    @Transactional
    public void registration(UserRegistrationDTO userRegistrationDTO) {
        if(userRegistrationDTO.getEmail() == null || userRegistrationDTO.getPassword() == null) {
            throw new IllegalArgumentException("E-mail i heslo musí být vyplněny");
        }

        String email = userRegistrationDTO.getEmail().toLowerCase();

        if(!(email.endsWith("@uhk.cz") || email.endsWith("@upce.cz"))){
            throw new IllegalArgumentException("Registrace je povolena pouze pro e-maily z domén @uhk.cz nebo @upce.cz");
        }
        if(userRepository.existsByEmail(email)){
           throw new IllegalArgumentException("Tento e-mail je již zaregistrován");
        }
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordHashingService.hash(userRegistrationDTO.getPassword()));

        userRepository.save(user);
    }

    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {
        loginRequestDTO.setEmail(loginRequestDTO.getEmail().toLowerCase());
        User user = userRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Nesprávný e-mail nebo heslo"));

        boolean passwordMatches = passwordHashingService.matches(
                loginRequestDTO.getPassword(), user.getPasswordHash()
        );

        if(!passwordMatches){
            throw new IllegalArgumentException("Nesprávný e-mail nebo heslo");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getUserId());

        return new AuthResponseDTO(token, user.getUserId(), user.getEmail());
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
