#!/bin/bash

cwd="repos/server"
yarn --cwd ${cwd} install

cwd="repos/client"
yarn --cwd ${cwd} install