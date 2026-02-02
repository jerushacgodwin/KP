CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NULL,
    action VARCHAR(255) NOT NULL,
    module VARCHAR(255) NOT NULL,
    entity_id VARCHAR(255) NULL,
    old_value TEXT NULL,
    new_value TEXT NULL,
    ip_address VARCHAR(255) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
