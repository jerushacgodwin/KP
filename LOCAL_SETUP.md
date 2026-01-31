# Setting Up Docker Locally on Windows

Since you are running Windows, the best way to run Docker is by installing **Docker Desktop**.

## 1. Download Docker Desktop
1.  Go to the [Docker Desktop Download Page](https://www.docker.com/products/docker-desktop/).
2.  Click **Download for Windows**.
3.  Run the installer executable (`Docker Desktop Installer.exe`).

## 2. Installation Steps
1.  When prompted, ensure **"Use WSL 2 instead of Hyper-V"** is checked (Recommended for best performance).
2.  Follow the installation wizard.
3.  **Restart your computer** when finished (This is usually required).

## 3. Start Docker
1.  After restarting, search for "Docker Desktop" in your Start Menu and open it.
2.  It may take a minute to start the Docker Engine.
3.  Accept the Service Agreement if prompted.
4.  Wait until the whale icon in your taskbar stops spinning and says "Docker Desktop is running".

## 4. Verification
Open your PowerShell or Command Prompt and run:

```powershell
docker --version
```

If it returns something like `Docker version 24.0.5...`, you are ready!

## 5. Run Your Application Locally
Once Docker is installed, you can build and run your application right here on your machine to test it before deploying.

Open a terminal in your project folder (`d:\LMSAPI\kpripo`) and run:
```powershell
docker compose up -d --build
```
Then verify at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
