#!/bin/bash

script_dir=$(dirname "$(realpath "$0")")
deluxe_wol_controller_dir=$script_dir/deluxe-wol-controller
deluxe_wol_router_dir=$script_dir/deluxe-wol-router

if ! dpkg-query -l npm > /dev/null 2>&1; then
    echo "Started installing npm..."
    sudo apt install -y npm
    echo "Successfully installed npm."
else
    echo "npm is already installed, skipped."
fi

if ! dpkg-query -l unzip > /dev/null 2>&1; then
    echo "Started installing unzip..."
    sudo apt install -y unzip
    echo "Successfully installed unzip."
else
    echo "unzip is already installed, skipped."
fi

if ! dpkg-query -l curl > /dev/null 2>&1; then
    echo "Started installing curl..."
    sudo apt install -y curl
    echo "Successfully installed curl."
else
    echo "curl is already installed, skipped."
fi

if ! dpkg-query -l git > /dev/null 2>&1; then
    echo "Started installing git..."
    sudo apt install -y git
    echo "Successfully installed git."
else
    echo "git is already installed, skipped."
fi

echo "Started downloading deluxe-wol-controller..."
curl -L -o deluxe-wol-controller-server.zip https://github.com/lvckydrip/deluxe-wol-controller/releases/latest/download/server.zip
sudo unzip -o deluxe-wol-controller-server.zip -d ./deluxe-wol-controller
echo "Successfully downloaded deluxe-wol-controller."

echo "Started cloning deluxe-wol-router..."
sudo git clone https://github.com/lvckydrip/deluxe-wol-router.git
echo "Successfully cloned deluxe-wol-router."

echo "Creating systemd service for controller..."
cat <<EOL | sudo tee "/etc/systemd/system/deluxe-wol-controller.service"
[Unit]
Description=Deluxe WakeOnLan Controller Service
After=multi-user.target

[Service]
ExecStart=/usr/bin/sudo /usr/bin/node $deluxe_wol_controller_dir/server.js
Type=simple
Restart=always
WorkingDirectory=$deluxe_wol_controller_dir

[Install]
WantedBy=multi-user.target
EOL
echo "Successfully created systemd service at /etc/systemd/system/deluxe-wol-controller.service"

echo "Creating systemd service for router..."
cat <<EOL | sudo tee "/etc/systemd/system/deluxe-wol-router.service"
[Unit]
Description=Deluxe WakeOnLan Router Service
After=multi-user.target

[Service]
ExecStart=/usr/bin/sudo /usr/bin/node $deluxe_wol_router_dir/main.js
Type=simple
Restart=always
WorkingDirectory=$deluxe_wol_router_dir

[Install]
WantedBy=multi-user.target
EOL
echo "Successfully created systemd service at /etc/systemd/system/deluxe-wol-router.service"

echo "Enabling services..."
sudo systemctl daemon-reload
sudo systemctl enable deluxe-wol-controller.service
sudo systemctl enable deluxe-wol-router.service
sudo systemctl start deluxe-wol-controller.service
sudo systemctl start deluxe-wol-router.service

echo "Services status:"
sudo systemctl status deluxe-wol-controller.service
sudo systemctl status deluxe-wol-router.service
