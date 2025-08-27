package com.taskbuddy.entity;

import jakarta.persistence.*;
import lombok.*;
import com.taskbuddy.enums.NotificationType;

@Entity
@Table(name = "notifications")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class Notification extends BaseEntity {
    @Column(nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    private NotificationType type; // e.g. ASSIGNMENT, COMMENT, GENERAL

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User recipient;

    // Rename 'read' to 'isRead'
    @Column(name = "is_read", nullable = false)
    private boolean isRead = false; // unread by default
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public NotificationType getType() {
        return type;
    }
    
    public void setType(NotificationType type) {
        this.type = type;
    }
    
    public User getRecipient() {
        return recipient;
    }
    
    public void setRecipient(User recipient) {
        this.recipient = recipient;
    }
    
    public boolean isRead() {
        return isRead;
    }
    
    public void setRead(boolean read) {
        isRead = read;
    }
}
