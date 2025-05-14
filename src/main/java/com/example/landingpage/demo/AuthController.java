// filepath: c:\Users\a1244980\Desktop\landingpage\demo\src\main\java\com\example\landingpage\demo\AuthController.java
package com.example.landingpage.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

   
    @PostMapping("/register")
public String register(@RequestBody User user) {
    if (userRepository.existsById(user.getUsername())) {
        return "User already exists!";
    }
    userRepository.save(user);
    return "User registered successfully!";
}

    
    @PostMapping("/login")
public String login(@RequestParam String identifier, @RequestParam String password) {
  
    User user = userRepository.findByUsernameOrEmail(identifier, identifier).orElse(null);

    if (user != null && user.getPassword().equals(password)) {
        return "Login successful!";
    }
    return "Invalid username/email or password!";
}

  
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

   
    @PutMapping("/update")
    public String updateUser(@RequestParam String username, @RequestParam String email) {
        User user = userRepository.findById(username).orElse(null);
        if (user != null) {
            user.setEmail(email);
            userRepository.save(user);
            return "User updated successfully!";
        }
        return "User not found!";
    }

    
    @DeleteMapping("/delete")
    public String deleteUser(@RequestParam String username) {
        if (userRepository.existsById(username)) {
            userRepository.deleteById(username);
            return "User deleted successfully!";
        }
        return "User not found!";
    }
}