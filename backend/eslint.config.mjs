import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "no-console": "off"
        },
        languageOptions: {
            globals: {
                process: "readonly",
                __dirname: "readonly",
                require: "readonly",
                module: "readonly",
                console: "readonly"
            }
        }
    }
];
