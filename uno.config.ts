import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
} from "unocss";

export default defineConfig({
  shortcuts: {
    "border-base": "border-gray-300 dark:border-gray-600",
    "text-color": "text-red light:text-gray-600",
    "bg-active": "bg-gray/10",
  },
  presets: [presetUno(), presetIcons(), presetAttributify()],
});
