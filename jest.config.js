module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/utils/testing/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  coveragePathIgnorePatterns: ["/**/__generated__/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "@/(.*)$": "<rootDir>/src/$1",
    "src/(.*)$": "<rootDir>/src/$1",
    "schema.json": "<rootDir>/$1",
  },
};
