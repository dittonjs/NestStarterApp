# ASDFVM Setup
1. Run
```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.1
```

1. Visit this [link](https://asdf-vm.com/guide/getting-started.html#_3-install-asdf) and follow the installation instructions for your OS and terminal. For Windows with WSL and most linux distros you will look at the "Bash & Git" section. For Mac you will look either at the "Bash & Git (macOS)" or the "ZSH & Git" section depending on your default terminal.

1. If you are on Mac make sure you have homebrew installed.
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
1. Close your terminal and reopen it.

## Installing the NodeJS plugin
1. Install the plugin
```bash
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

## Installing the Postgres plugin
1. Install the dependencies

Mac
```bash
brew install gcc readline zlib curl ossp-uuid
```

Ubuntu
```
sudo apt-get install build-essential libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev uuid-dev
```

2. Install the plugin
```
asdf plugin-add postgres
```


Restart your terminal when it is done.