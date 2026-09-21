// src/scripts/seedAdmin.ts
import bcrypt from 'bcrypt';
import { sequelize } from '../models';
import { Admin } from '../models';

const seedAdmin = async () => {
  try {
    // Sync models (creates tables if they don't exist)
    await sequelize.sync();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { email: 'admin' } });
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin', 10);

    // Create admin
    await Admin.create({
      email: 'admin',
      password: hashedPassword,
      name: 'Administrator',
    });

    console.log('✅ Default admin user created');
    console.log('   Email: admin');
    console.log('   Password: admin');
    console.log('   Hash:', hashedPassword);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed admin:', error);
    process.exit(1);
  }
};

seedAdmin();
