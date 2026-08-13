# MiniTools Video Downloader — backend image
# Used by Railway (and any Docker host) so that ffmpeg + yt-dlp are
# present at runtime. The frontend stays on Vercel; only this /server
# folder is built here.

FROM node:20-slim

# ffmpeg for conversion, python3 + pip for yt-dlp.
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg python3 python3-pip ca-certificates \
    && pip3 install --no-cache-dir --break-system-packages --upgrade yt-dlp \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Node dependencies first (better layer caching).
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the backend source.
COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["npm", "start"]
