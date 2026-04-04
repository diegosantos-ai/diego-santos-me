#!/bin/bash
echo "Esperando Nginx..."
sleep 60
ssh -o BatchMode=yes -o StrictHostKeyChecking=no -i ~/.ssh/id_ed25519 ubuntu@15.204.174.145 "
sudo docker run --rm -v /home/ubuntu/portfolio-deploy/certbot/conf:/etc/letsencrypt -v /home/ubuntu/portfolio-deploy/certbot/www:/var/www/certbot certbot/certbot certonly --webroot -w /var/www/certbot -d diegosantos.me -d www.diegosantos.me --non-interactive --agree-tos -m devops@diegosantos.me
"
