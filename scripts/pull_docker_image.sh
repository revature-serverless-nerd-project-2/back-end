#!/bin/bash
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 746012514523.dkr.ecr.us-east-2.amazonaws.com
docker pull 746012514523.dkr.ecr.us-east-2.amazonaws.com/e-commerce-backend:latest