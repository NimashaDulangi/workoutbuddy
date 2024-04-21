package com.fithub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fithub.backend.entity.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
    Post findByPostName(String postName);
}
