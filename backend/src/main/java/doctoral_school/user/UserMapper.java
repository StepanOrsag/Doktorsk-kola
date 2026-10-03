package doctoral_school.user;

import doctoral_school.user.dto.v1.UserDTO;
import org.jspecify.annotations.NullMarked;
import org.springframework.stereotype.Component;

@NullMarked
@Component
public class UserMapper {

    public UserDTO toUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setTelephone(user.getTelephone());
        return userDTO;
    }
}
