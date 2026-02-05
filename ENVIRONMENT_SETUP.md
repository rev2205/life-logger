# Environment Configuration Guide

## 🔐 Handling Secrets Securely

This project uses environment variables and local configuration files to keep secrets out of version control.

## Setup for Local Development

### Option 1: Using application-local.properties (Recommended for Development)

1. **Copy the template file:**
   ```bash
   cd backend/src/main/resources
   copy application-local.properties.template application-local.properties
   ```

2. **Generate a secure JWT secret:**
   ```powershell
   # PowerShell
   [Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```

3. **Edit `application-local.properties`** and replace `YOUR_SECURE_JWT_SECRET_HERE` with your generated secret

4. **Run the application with the local profile:**
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=local
   ```

### Option 2: Using Environment Variables (Recommended for Production)

Set the `JWT_SECRET` environment variable:

**Windows (PowerShell):**
```powershell
$env:JWT_SECRET="your-generated-secret-here"
mvn spring-boot:run
```

**Windows (Command Prompt):**
```cmd
set JWT_SECRET=your-generated-secret-here
mvn spring-boot:run
```

**Linux/Mac:**
```bash
export JWT_SECRET="your-generated-secret-here"
mvn spring-boot:run
```

## Production Deployment

### For Cloud Platforms:

- **Heroku:** Use Config Vars in dashboard
- **AWS:** Use AWS Secrets Manager or Parameter Store
- **Azure:** Use Azure Key Vault
- **Docker:** Pass as environment variable with `-e JWT_SECRET=...`

### Example Docker Run:
```bash
docker run -e JWT_SECRET="your-secret" -p 8080:8080 life-logger-backend
```

## ⚠️ Security Best Practices

1. **NEVER commit secrets to Git**
   - `application-local.properties` is gitignored
   - Only commit `application-local.properties.template`

2. **Use different secrets for different environments**
   - Development: Local file or environment variable
   - Production: Cloud secrets manager

3. **Rotate secrets regularly** in production

4. **Keep secrets long and random**
   - Minimum 256 bits (32 bytes) for JWT secrets
   - Use cryptographically secure random generators

## Files in This Project

| File | Purpose | Committed to Git? |
|------|---------|-------------------|
| `application.properties` | Base configuration with placeholders | ✅ Yes |
| `application-local.properties.template` | Template for local config | ✅ Yes |
| `application-local.properties` | Your actual secrets (local dev) | ❌ No (gitignored) |

## Troubleshooting

**Error: "JWT secret not configured"**
- Make sure you've set the `JWT_SECRET` environment variable OR
- Created `application-local.properties` with your secret

**Error: "Weak key"**
- Your JWT secret must be at least 256 bits (32 bytes)
- Generate a new one using the PowerShell command above
