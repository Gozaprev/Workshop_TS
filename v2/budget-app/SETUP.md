# 🚀 Workshop Setup Guide

Welcome to the Finance Tracker Workshop setup! Follow this guide carefully to get your development environment ready.

## 🛠️ Setup Instructions

### Step 1: Clone and Navigate to Project

```bash
# Clone the repository (if not already done)
git clone <repository-url>

# Navigate to the workshop directory
cd Class14/workshop-app
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies (execute this command in the terminal opened on root directory)
# To open a root directory simply right click on package.json, and click 'Open in Integrated terminal'. Since package.json is on root level always, the terminal will be opened on root directory.
npm install

```

> **💡 Tip**: This might take a few minutes. Grab a coffee! ☕

### Step 3: Database Setup

#### Option Local PostgreSQL Installation

1. Just in case start pgAdmin that we had installed on Postgresql class.
2. Make sure database is existing and you can connect to it.
3. If there is no database feel free to create one.
   NOTE: Remember, the database name and password will be needed in the app to establish connection
   with the database. The default database is postgres and default password is postgres

### Step 4: Environment Configuration

1. **Create environment file**:

- Create new .env file on root level

2. **Edit the `.env` file** with your preferred text editor:

- Copy the contents of env.example into .env
- If needed, replace the environment variables values with the correct values from you setup,
  for example if DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE are different then the default one feel free to change them.

### Step 5: Verify Setup

1. **Start the development server**:

   ```bash
   npm run start:dev
   ```

### Expected Results

- ✅ Server starts without errors
- ✅ Database connection is established
- ✅ API endpoints respond (even with placeholder data)

---

## 📚 Next Steps

Once your setup is complete:

1. **📖 Read the main [README.md](./README.md)** for workshop instructions
2. **🟢 Start with the Easy Level** tasks
3. **🧪 Test your endpoints** as you build
4. **💡 Ask questions** if you get stuck!

---

## 🆘 Getting Help

If you encounter issues during setup:

1. **Check the troubleshooting section** above
2. **Search for similar issues** in the workshop repository
3. **Ask your instructor** or teaching assistants
4. **Check the console logs** for detailed error messages

---

<div align="center">
  <h2>🎉 Setup Complete!</h2>
  <p>You're all set to start building your Finance Tracker!</p>
  <p><strong>Head over to the <a href="./README.md">README.md</a> to begin your workshop journey! 🚀</strong></p>
</div>

---

<div align="center">
  <sub>Need help? Don't hesitate to ask! 💬</sub>
</div>
