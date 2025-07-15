package com.lmsync.finalProjectCourse.gemjjok.repository;

import com.lmsync.finalProjectCourse.gemjjok.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, String> {
} 