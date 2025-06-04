declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        close: () => void;
        expand: () => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        onEvent: (eventType: string, callback: () => void) => void;
        sendData: (data: any) => void;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          start_param?: string;
        };
      };
    };
  }
}

export const initTelegramApp = () => {
  if (typeof window !== 'undefined') {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

export const getTelegramUser = () => {
  if (typeof window !== 'undefined') {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
};

export const showMainButton = (text: string, callback: () => void) => {
  if (typeof window !== 'undefined') {
    const { MainButton } = window.Telegram.WebApp;
    MainButton.text = text;
    MainButton.onClick(callback);
    MainButton.show();
  }
};

export const hideMainButton = () => {
  if (typeof window !== 'undefined') {
    window.Telegram.WebApp.MainButton.hide();
  }
};

export const sendDataToBot = (data: any) => {
  if (typeof window !== 'undefined') {
    window.Telegram.WebApp.sendData(JSON.stringify(data));
  }
}; 