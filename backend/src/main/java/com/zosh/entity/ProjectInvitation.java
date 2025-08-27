package com.taskbuddy.entity;

import jakarta.persistence.*;
import lombok.*;
import com.taskbuddy.enums.InvitationStatus;

@Entity
@Table(name = "project_invitations")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class ProjectInvitation extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    private User invitedUser;

    @Enumerated(EnumType.STRING)
    private InvitationStatus status = InvitationStatus.PENDING;
    
    @ManyToOne(fetch = FetchType.LAZY)
    private User invitedBy;
    
    public Project getProject() {
        return project;
    }
    
    public void setProject(Project project) {
        this.project = project;
    }
    
    public User getInvitedUser() {
        return invitedUser;
    }
    
    public void setInvitedUser(User invitedUser) {
        this.invitedUser = invitedUser;
    }
    
    public InvitationStatus getStatus() {
        return status;
    }
    
    public void setStatus(InvitationStatus status) {
        this.status = status;
    }
    
    public User getInvitedBy() {
        return invitedBy;
    }
    
    public void setInvitedBy(User invitedBy) {
        this.invitedBy = invitedBy;
    }
}
