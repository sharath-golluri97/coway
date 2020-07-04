const _ = require("lodash");
const express = require("express");

const app = express();

const configDir = "./../config/";
const appPackage = require("./../../../package.json");

function getEnv() {
  return app.get("env") || "development";
}

function getAppConfig() {
  const appEnv = getEnv();
  const envFile = `${configDir}config.${appEnv.toLowerCase()}.json`;
  const { api, ...rest } = require(envFile);
  const _api = {};
  for (const key in api) {
    const service = api[key];
    _api[key] = {};
    const { baseUrl } = service;
    const { routes } = service;
    for (const name in routes) {
      let route = routes[name];
      route = baseUrl + route;
      _api[key][name] = route;
    }
  }
  return {
    ...rest,
    api: _api
  };
}

const appConfig = getAppConfig();

module.exports = {
  appConfig,
  getEnv
};
