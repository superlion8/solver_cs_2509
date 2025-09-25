#!/bin/bash

# 构建Chat应用
echo "Building Chat application..."
cd solver
npm run build

# 复制构建文件到public目录
echo "Copying build files to public directory..."
cd ..
cp -r solver/dist/* public/

echo "Build completed successfully!"
echo "Chat app is now available at /chat"
echo "Homepage is available at /"
echo "Expert page is available at /expert"
