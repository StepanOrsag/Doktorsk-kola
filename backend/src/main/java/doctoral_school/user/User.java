package doctoral_school.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users", schema="public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name="password_hash", nullable = false)
    private String passwordHash;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="email", nullable = false, unique = true)
    private String email;

    @Column(name="telephone", nullable = true, unique = true)
    private String telephone;
}
