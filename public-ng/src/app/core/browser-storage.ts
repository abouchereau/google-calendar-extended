const storage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const browserStorage = {
  getItem(key: string): string | null {
    const s = storage();
    if (!s) {
      return null;
    }

    try {
      return s.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    const s = storage();
    if (!s) {
      return false;
    }

    try {
      s.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  removeItem(key: string): boolean {
    const s = storage();
    if (!s) {
      return false;
    }

    try {
      s.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};
