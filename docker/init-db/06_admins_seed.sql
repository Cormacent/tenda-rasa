-- Seed: Insert default admin user
-- Password: admin
-- Hash generated with: bcrypt.hashSync('admin', 10)

INSERT INTO admins (email, password, name)
VALUES ('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator')
ON CONFLICT (email) DO NOTHING;
