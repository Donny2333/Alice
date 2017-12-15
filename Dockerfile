FROM node:8.9

# Set the working directory
WORKDIR /alice

# Copy the current directory contents into the container
ADD . /alice

# Set an entrypoint, to automatically install node modules
ENTRYPOINT ["/bin/bash", "-c", "if [[ ! -d node_modules ]]; then npm install --registry https://registry.npm.taobao.org; fi; exec \"${@:0}\";"]

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run pm2 when the container launches
CMD ["npm", "run", "pm2"]
