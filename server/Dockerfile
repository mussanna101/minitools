# MiniTools Video Downloader — backend image
# Used by Railway (and any Docker host) so that ffmpeg + yt-dlp are
# present at runtime. The frontend stays on Vercel; only this /server
# folder is built here.

FROM node:20-slim

# ffmpeg for conversion, python3 + pip for yt-dlp & the POT plugin, git for
# cloning the BgUtils POT provider, and the native libs its `canvas`
# dependency needs (BotGuard challenge image processing).
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ffmpeg \
        python3 python3-pip \
        ca-certificates git \
        build-essential pkg-config \
        libcairo2-dev libpango1.0-dev librsvg2-dev libjpeg-dev libgif-dev \
    && pip3 install --no-cache-dir --break-system-packages --upgrade yt-dlp bgutil-ytdlp-pot-provider \
    && rm -rf /var/lib/apt/lists/*

# Build the BgUtils POT provider — a Node HTTP server on :4416 that generates
# Proof-of-Origin tokens. This makes YouTube treat requests from the datacenter
# IP as legitimate, which is what removes the need for users to upload cookies.
RUN git clone --depth 1 https://github.com/Brainicism/bgutil-ytdlp-pot-provider.git /opt/pot-provider \
    && cd /opt/pot-provider/server \
    && npm ci --no-audit --no-fund \
    && npx tsc

# Data dir for optional admin cookies / persisted state.
RUN mkdir -p /data

WORKDIR /app

# Install Node dependencies first (better layer caching).
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the backend source.
COPY . .

ENV PORT=4000
ENV POT_SERVER_BIN=/opt/pot-provider/server/build/main.js
ENV POT_SERVER_PORT=4416
EXPOSE 4000

CMD ["npm", "start"]
