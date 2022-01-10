# ASDFVM Setup
1. Run
```bash
$ git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.1
```

2. Run
```bash
$ code ~/.bashrc
```
This assumes you have VS Code installed on your computer (if you don't then install it by searching for it online and installing it).

3. Add the following lines at the end of the file and save it.
```bash
. $HOME/.asdf/asdf.sh
. $HOME/.asdf/completions/asdf.bash
```
4. If you are on Mac make sure you have homebrew installed.
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
5. Close your terminal and reopen it.

## Installing the NodeJS plugin
1. Install the plugin
```bash
$ asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

## Installing the Postgres plugin
1. Install the dependencies

Mac
```bash
$ brew install gcc readline zlib curl ossp-uuid
```

Ubuntu
```
$ sudo apt-get install build-essential libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev uuid-dev
```

2. Install the plugin
```
$ asdf plugin-add postgres
```


Restart your terminal when it is done.