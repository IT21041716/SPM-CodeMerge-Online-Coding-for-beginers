package com.example.CodeFest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.CodeFest.model.User;
import com.example.CodeFest.repo.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository repository;

    public User save(User user) {
        return repository.save(user);
    }

    public boolean delete(String id) {
        repository.deleteById(id);
        return true;
    }

    public boolean update(String id, User updatedUser) {
        User existingUser = repository.findById(id).orElse(null);

        if (existingUser == null) {
            return false;
        } else {
            if (updatedUser.getFirstName() != null)
                existingUser.setFirstName(updatedUser.getFirstName());
            if (updatedUser.getLastName() != null)
                existingUser.setFirstName(updatedUser.getLastName());
            if (updatedUser.getEmail() != null)
                existingUser.setEmail(updatedUser.getEmail());
            if (updatedUser.getContactNo() != null)
                existingUser.setContactNo(updatedUser.getContactNo());
            if (updatedUser.getImage() != null)
                existingUser.setImage(updatedUser.getImage());
            if (updatedUser.getPassword() != null)
                existingUser.setPassword(updatedUser.getPassword());
            repository.save(existingUser);
            return true;
        }
    }

    public List<User> getAll() {
        return repository.findAll();
    }

    public Optional<User> getOne(String id) {
        return repository.findById(id);
    }
     

    public String login(User user) {
        User existingUser = repository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return "email";
        } else {
            if (existingUser.getPassword().equals(user.getPassword())) {
                return existingUser.getId();
            } else {
                return "password";
            }
        }
    }
}
