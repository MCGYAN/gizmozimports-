# Fix: "running scripts is disabled on this system"

PowerShell is blocking `npx`, `npm`, and other scripts. Fix it once:

## Option 1: Allow scripts for your user (recommended)

In **PowerShell** (Run as Administrator if needed), run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- **RemoteSigned**: Your own scripts run; downloaded scripts must be signed (or run from a local path).
- **CurrentUser**: Only your account is affected, not the whole machine.

Then try again:

```powershell
npx vercel
```

## Option 2: Bypass for this session only

To allow scripts only in the current window:

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

This resets when you close the terminal.

## Reference

- [about_Execution_Policies](https://go.microsoft.com/fwlink/?LinkID=135170)
