FROM gitpod/workspace-full

# Install Node.js 20 LTS
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - \
    && sudo apt-get install -y nodejs

# Enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Preinstall Expo CLI (new unified CLI, not expo-cli)
RUN pnpm add -g expo
