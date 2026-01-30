# Deploying to Google Cloud VM

This guide assumes you have a Google Cloud VM (e.g., Ubuntu or Debian) ready.

## 1. Install Docker and Docker Compose
Connect to your VM via SSH and run the following commands to install Docker:

```bash
# Update package list
sudo apt-get update

# IF YOU TRIED THE PREVIOUS COMMANDS AND FAILED:
# Remove the incorrect repository file that causes the "bookworm Release" error
sudo rm -f /etc/apt/sources.list.d/docker.list
sudo apt-get update

# Install Docker using the official convenience script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Verify installation
sudo docker run hello-world
```

## 2. Transfer Files
You have two main options to get your code to the VM:

### Option A: Git Clone (Recommended if you have a GitHub Personal Access Token)
Password authentication via command line was removed by GitHub in 2021. You must use a Personal Access Token (PAT).

1.  Go to **GitHub Settings** -> **Developer settings** -> **Personal access tokens** -> **Tokens (classic)**.
3.  Clone using the token:
    ```bash
    git clone https://<YOUR_TOKEN>@github.com/jerushacgodwin/KP.git
    cd KP
    ```

> [!WARNING]
> You encountered a **403 Forbidden** error. This means your Token (GitHub PAT) does not have the correct permissions (likely missing "Contents" access for Fine-Grained tokens, or "repo" scope for Classic tokens).
> **STOP STRUGGLING WITH GIT.**
>
> **Please use Option B below.** It is faster and requires NO Git login.

### Option B: Direct File Upload (No Git required on VM)
Since you have the files on your local machine, you can upload them directly using `scp` (or WinSCP/FileZilla).

Run this command **from your local Windows terminal** (Run in PowerShell/CMD, NOT inside the VM):
```powershell
# Upload the entire folder to the VM
scp -r d:\LMSAPI\kpripo <USERNAME>@<VM_PUBLIC_IP>:~/kpripo
```
*Replace `<USERNAME>` and `<VM_PUBLIC_IP>` with your VM credentials.*

### Option C: Zipping and Uploading
If SCP is slow with many files:
1.  **Locally**: Zip your project (exclude `node_modules` and `.next`).
2.  **Locally**: `scp project.zip <USERNAME>@<VM_PUBLIC_IP>:~/`
3.  **On VM**: `unzip project.zip`

## 3. Configuration
**First, navigate into the project folder:**
```bash
cd kpripo
```
*(If you renamed the folder during upload, use that name. Run `ls` to see what folders are there.)*

Create a `.env` file from the example:

```bash
cp .env.example .env
```

**CRITICAL STEP:**
Edit `.env` and set `NEXT_PUBLIC_API_URL` to your VM's Public IP address.
```ini
NEXT_PUBLIC_API_URL=http://<YOUR_VM_PUBLIC_IP>:4000
```
If you skip this, the frontend (browser) will try to connect to `localhost`, which won't work for other users.

## 4. Deploy
Run the application with Docker Compose:

```bash
sudo docker compose up -d --build
```
- `-d`: Run in detached mode (background)
- `--build`: Force rebuild of images

## 5. Verify
- **Frontend**: Visit `http://<YOUR_VM_PUBLIC_IP>:3000`
- **Backend API**: Visit `http://<YOUR_VM_PUBLIC_IP>:4000`

## Troubleshooting
- **Firewall**: Ensure GCP Firewall rules allow traffic on ports **3000** and **4000**.
  - Go to VPC Network -> Firewall
  - Create Rule -> Allow specific ports: `tcp:3000,4000`
  - Targets: All instances in the network
- **Logs**: Check logs if something fails.
  ```bash
  sudo docker compose logs -f
  ```

### Build Stuck or Slow? (Add Swap Space)
If `npm ci` hangs for more than 10 minutes or fails with "Killed", your VM likely ran out of RAM (common on small EC2/GCP instances).

**Fix: Create a 2GB Swap File**
Run these commands on the VM:
```bash
# Create a 2GB file
sudo fallocate -l 2G /swapfile
# Set permissions
sudo chmod 600 /swapfile
# Mark as swap
sudo mkswap /swapfile
# Enable it
sudo swapon /swapfile
# Make it permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
Then try the build command again.
