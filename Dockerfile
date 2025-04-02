FROM node:23-alpine

# Accept build argument
ARG NEXT_PUBLIC_BACKEND_URL
# Make it available as ENV at runtime (optional but good)
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Inject variable into Next.js during build
RUN NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL} npm run build

# Start
CMD ["npm", "start"]
