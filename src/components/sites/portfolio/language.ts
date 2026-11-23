"use client";

import { useSyncExternalStore } from "react";
import * as en from "./content";
import * as zh from "./content.zh";

/**
 * 中英文切换。网址不变：选择记在浏览器里（localStorage），下次打开还是上次选的语言。
 * 第一次打开默认英文。英文文案在 content.ts，中文文案在 content.zh.ts。
 */
export type Lang = "en" | "zh";

const STORAGE_KEY = "wl-lang";
const CHANGE_EVENT = "wl-lang-change";

/** 浏览器不让用 localStorage 时（例如隐私模式），至少在当前页面里记住 */
let fallback: Lang = "en";

function readLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "zh" || stored === "en") return stored;
  } catch {
    // 读不到就用 fallback
  }
  return fallback;
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function setLang(lang: Lang) {
  fallback = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // 存不了也没关系，当前页面仍然会切换
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, readLang, () => "en");
}

const CONTENT = {
  en: { site: en.site, sections: en.sections, allProjects: en.allProjects, about: en.about },
  zh: { site: zh.site, sections: zh.sections, allProjects: zh.allProjects, about: zh.about },
};

/** 当前语言的全部文案 */
export function useContent() {
  return CONTENT[useLang()];
}
