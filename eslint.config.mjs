import globals from "globals"
import neostandard from "neostandard"
import stylistic from "@stylistic/eslint-plugin"
import tseslint from "@typescript-eslint/eslint-plugin"
import pluginVue from "eslint-plugin-vue"
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript"

// 旧 .eslintrc.json 的 rules/overrides 分别在独立配置对象里覆盖，插件需在同一对象中声明
const plugins = {
  "@stylistic": stylistic,
  "@typescript-eslint": tseslint
}

// 示例/组件里直接使用的地图与第三方全局，沿用旧 .eslintrc.json 的 globals 清单
const marsGlobals = {
  defineProps: "readonly",
  defineEmits: "readonly",
  defineExpose: "readonly",
  withDefaults: "readonly",

  currentPath: "readonly",
  globalMsg: "readonly",
  globalAlert: "readonly",
  globalNotify: "readonly",
  showLoading: "readonly",
  hideLoading: "readonly",

  Cesium: "readonly",
  mars3d: "readonly",
  L: "readonly",
  mars2d: "readonly",
  Typhoon: "readonly",
  turf: "readonly",
  BMap: "readonly",
  randomLatLng: "readonly",
  echarts: "readonly",
  mapv: "readonly",
  Terraformer: "readonly",
  AMap: "readonly",
  kgUtil: "readonly",
  shpUtil: "readonly",
  netcdfjs: "readonly",
  ol: "readonly",
  olcs: "readonly",
  OSMBuildings: "readonly"
}

// mars2d-vue-example 项目专用规则：由旧 .eslintrc.json 平移，语义不变
const projectRules = {
  "no-unused-vars": "off",
  "prefer-regex-literals": "off",
  "vue/multi-word-component-names": ["error", { ignores: ["index", "App"] }],
  "vue/comment-directive": ["off", { reportUnusedDisableDirectives: false }],
  "vue/block-lang": "off", // eslint-plugin-vue 10 的 essential 新增项；旧配置未启用，避免 JS 组件页面被判错
  "vue/no-deprecated-slot-attribute": "off",
  "vue/valid-v-slot": "off",

  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-useless-constructor": "off",
  "@typescript-eslint/no-var-requires": "off",
  "@typescript-eslint/no-non-null-assertion": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",
  "@typescript-eslint/ban-ts-comment": "off",
  "@typescript-eslint/no-unused-vars": "off",

  "@stylistic/indent": "off",
  eqeqeq: ["error", "always", { null: "ignore" }],
  "@stylistic/quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: "always" }],
  curly: ["error", "all"],
  "@stylistic/padded-blocks": "off",
  "global-require": "off",
  "@stylistic/comma-dangle": "error",
  "consistent-return": "off",
  "default-case": "off",
  "block-scoped-var": "error",
  "guard-for-in": "off",
  "constructor-super": "error",
  "@stylistic/dot-location": ["off", "property"],
  "@stylistic/comma-style": ["error", "last"],
  "@stylistic/space-before-function-paren": ["off", "always"],
  "@stylistic/object-curly-newline": ["error", { multiline: true, consistent: true }],
  "object-shorthand": "off",
  "@stylistic/computed-property-spacing": ["error", "never"],

  "no-debugger": "warn",
  "no-console": "off",
  "no-var": "error",
  "@stylistic/no-trailing-spaces": "off",
  "no-prototype-builtins": "off",
  "no-template-curly-in-string": "off",
  "@stylistic/no-mixed-spaces-and-tabs": "error",
  "no-new": "error",
  "no-new-wrappers": "error",
  "no-self-assign": "error",
  "no-self-compare": "error",
  "no-case-declarations": "error",
  "no-extend-native": "error",
  "no-extra-bind": "error",
  "no-extra-label": "error",
  "no-fallthrough": "error",
  "@stylistic/no-floating-decimal": "error",
  "no-global-assign": "error",
  "no-multi-str": "error",
  "no-const-assign": "error",
  "no-dupe-class-members": "error",
  "no-duplicate-imports": "off",
  "no-useless-constructor": "off",
  "no-useless-escape": "off",
  "no-dupe-keys": "error",
  "no-func-assign": "error",
  "no-nested-ternary": "error",
  "@stylistic/no-multiple-empty-lines": ["error", { max: 4 }],
  "new-cap": "off",
  camelcase: "off"
}

export default defineConfigWithVueTs(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "public/lib/**",
      "public/temp/**",
      "src/widgets/**/*.js",
      "src/example/a-next/**",
      "src/common/*.js",
      "docs/**",
      "bin/**",
      ".husky/**",
      ".vscode/**",
      ".idea/**"
    ]
  },
  ...neostandard(),
  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  {
    plugins,
    // ESLint 9/10 默认把未生效的 eslint-disable 注释报 warn；旧配置无此行为，保持基线不变
    linterOptions: {
      reportUnusedDisableDirectives: "off"
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...marsGlobals
      }
    },
    rules: projectRules
  },
  {
    // 公共层（组件/状态/工具）按 warn 级收紧，src/example 示例目录保持宽松配置
    files: ["src/components/**/*.{js,vue,ts}", "src/widgets/**/*.{js,vue,ts}", "src/utils/**/*.{js,vue,ts}"],
    plugins,
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/ban-ts-comment": "warn"
    }
  },
  {
    files: ["src/components/**/*.{ts,vue}", "src/widgets/**/*.{ts,vue}", "src/utils/**/*.{ts,vue}"],
    plugins,
    rules: {
      "@typescript-eslint/no-unused-vars": "warn"
    }
  },
  {
    files: ["src/components/**/*.js", "src/widgets/**/*.js", "src/utils/**/*.js"],
    rules: {
      "no-unused-vars": "warn"
    }
  }
)
