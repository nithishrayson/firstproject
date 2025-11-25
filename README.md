# Org Anonymous Chat — Local Testing Notes

This project enforces that users from the SECE domain (@sece.ac.in) can sign in with their email and password.

Behavior summary:
- Emails that end with `@sece.ac.in` are allowed to sign in, but accounts must be pre-provisioned by your college administration (this app no longer auto-creates @sece.ac.in accounts). If sign-in with the provided password fails, contact your college admins to ensure your account exists and the password is correct.
- Emails outside the SECE domain must be present in the `allowedUsers` Firestore collection (document id = email) to sign in; these non-SECE demo accounts may still be created automatically by the client.

How to test locally:
1. Open `index.html` in a browser using a local static server (recommended) or VS Code Live Server.
2. Edit `firebase-config.example.js` and fill in your Firebase project's settings (or copy it to `firebase-config.js` and edit as needed). The app expects a module named `firebase-config.example.js` as currently configured.
3. Use an email that ends with `@sece.ac.in` and a password (the account must already exist and be provided by your college — the client will not create @sece.ac.in accounts). If sign-in fails, contact your college admin to confirm the credentials.

New page flow (single entry point):
- The first page / entry point is `index.html` (login page). After a successful sign-in any authorized user will be sent to `board.html` — the suggestion board where posting and voting happen.
- `board.html` is protected and requires a signed-in, authorized session. Messages are posted anonymously (identity not shown) and voting works for signed-in users.

Security notes:
- For a production app, prefer pre-provisioned accounts (as you're using). Avoid auto-creation and require either admin-invited accounts or a proper identity provider.
- Make sure Firestore and Authentication rules are locked down to prevent unauthorized access.

Quick tip for running a minimal server (Node):

```powershell
# from project root
npx http-server -c-1 .
# or
python -m http.server 8000
```

Open `http://localhost:8080` (http-server default) or `http://localhost:8000` for Python.
