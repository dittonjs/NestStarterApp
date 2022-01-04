# Setup WSL
1. Open the `Turn Windows features on or off` page in the Control Panel
2. Enable `Window Subsystem for Linux` and `Virtual Machine Platform`
3. Restart your computer
4. Install windows terminal from the Microsoft app store.
5. Open Windows Terminal
6. Run the command `wsl --set-default-version 2`
7. Run the command `wsl --install -d Ubuntu`
8. Fill out the information when the new window opens.
9. In your ubuntu terminal create an ssh-key by running `ssh-keygen`. I would just leave everything as the default including the password empty for this key.
10. Get your public key by running `cat ~/.ssh/id_rsa.pub` in your ubuntu terminal.
11. Add that key to github.
12. In the Windows Terminal app setting set the default profile to be Ubuntu (you may need to close windows terminal and reopen it for Ubuntu to show up.)

