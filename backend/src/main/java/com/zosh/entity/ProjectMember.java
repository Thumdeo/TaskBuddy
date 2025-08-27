package com.taskbuddy.entity;

import jakarta.persistence.*;
import lombok.*;
import com.taskbuddy.enums.ProjectRole;

@Entity
@Table(name = "project_members")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMember extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Enumerated(EnumType.STRING)
    private ProjectRole role = ProjectRole.MEMBER; // e.g., MEMBER, MANAGER
    
    public Project getProject() {
        return project;
    }
    
    public void setProject(Project project) {
        this.project = project;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public ProjectRole getRole() {
        return role;
    }
    
    public void setRole(ProjectRole role) {
        this.role = role;
    }
}
