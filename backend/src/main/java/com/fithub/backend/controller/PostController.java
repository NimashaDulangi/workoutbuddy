package com.fithub.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fithub.backend.entity.Post;
import com.fithub.backend.service.PostService;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService service;

    @PostMapping("/post")
    public Post addPost(@RequestBody Post post) {
        return service.savePost(post);
    }

    @GetMapping("/posts")
    public List<Post> findAllPosts() {
        return service.getPosts();
    }

    @GetMapping("/post/id/{id}")
    public Post findPostById(@PathVariable int id) {
        return service.getPostById(id);
    }

    @GetMapping("/post/name/{name}")
    public Post findPostByName(@PathVariable String name) {
        return service.getPostByName(name);
    }

    @PutMapping("/post")
    public Post updatePost(@RequestBody Post post) {
        return service.updatePost(post);
    }

    @DeleteMapping("/post/{id}")
    public String deletePost(@PathVariable int id) {
        return service.deletePost(id);
    }
}
