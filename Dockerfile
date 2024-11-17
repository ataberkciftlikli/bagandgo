# Stage 1: Build React frontend
FROM node:14 AS frontend

WORKDIR /app/frontend

COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install

COPY frontend/ ./
RUN yarn build

# Stage 2: Build Django backend
FROM python:3.13 AS backend

WORKDIR /app/backend

COPY backend/requirements.txt ./
RUN pip install -r requirements.txt

COPY backend/ ./

# Copy built frontend to Django static files
COPY --from=frontend /app/frontend/build /app/backend/static

# Expose port for Django
EXPOSE 8000

# Run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]