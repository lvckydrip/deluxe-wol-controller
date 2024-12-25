#!/bin/bash

script_dir=$(dirname "$(realpath "$0")")
swapfile_content="CONF_SWAPSIZE=4096"

if [ "$(cat "/etc/dphys-swapfile")" != "$swapfile_content" ]; then
  echo "Increasing swap file size..."
  sudo dphys-swapfile swapoff
  sudo echo $swapfile_content | sudo tee "/etc/dphys-swapfile"
  sudo dphys-swapfile setup
  sudo dphys-swapfile swapon
  echo "Successfully changed swap file size. Rebooting now..."
  sudo reboot
fi

echo "Started installing npm and pnpm..."
sudo apt install npm -y
sudo npm install -g pnpm
echo "Successfully installed npm and pnpm."

echo "Run pnpm install..."
cd "$script_dir" || exit
sudo pnpm install --production
echo "Successfully finished pnpm install."

echo "Run npm run build..."
sudo npm run build
echo "Successfully finished pnpm run build."

echo "Creating systemd service..."
cat <<EOL | sudo tee "/etc/systemd/system/deluxe-wol-controller.service"
[Unit]
Description=Deluxe WakeOnLan Controller Service
After=multi-user.target

[Service]
ExecStart=/usr/bin/sudo /usr/bin/npm run start
Type=simple
Restart=always
WorkingDirectory=$script_dir

[Install]
WantedBy=multi-user.target
EOL
echo "Successfully created systemd service at /etc/systemd/system/deluxe-wol-controller.service"

echo "Enabling service..."
sudo systemctl daemon-reload
sudo systemctl enable deluxe-wol-controller.service
sudo systemctl start deluxe-wol-controller.service

echo "Service status:"
sudo systemctl status deluxe-wol-controller.service
