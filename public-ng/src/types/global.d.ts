export {};

declare global {

  interface Navigator {
    standalone?: boolean;
  }

  interface Window {
    Capacitor?: {
      isNativePlatform(): boolean;
    };
  }
  
}