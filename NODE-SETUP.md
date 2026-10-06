# Fix "npm is not recognized"

Your terminal can't find **Node.js**. Do one of the following.

---

## Option 1: Install Node.js (if you never installed it)

1. Go to **https://nodejs.org**
2. Download the **LTS** version (Windows Installer `.msi`).
3. Run the installer. Leave **"Add to PATH"** checked.
4. **Close and reopen** Cursor (or open a **new** terminal).
5. In the project folder run:
   ```powershell
   npm run dev
   ```

---

## Option 2: Node is installed but this terminal doesn’t see it

- **Restart Cursor** so it picks up the PATH, then open a new terminal and run `npm run dev`.
- Or open a **new PowerShell/Command Prompt** window (from Start menu), `cd` to your project, and run `npm run dev`.

---

## Option 3: Use the script that searches for Node

In PowerShell, from the project folder:

```powershell
.\start-dev.ps1
```

This script looks for Node in common install locations and runs `npm run dev` if it finds it. If it still fails, use Option 1 to install Node.
