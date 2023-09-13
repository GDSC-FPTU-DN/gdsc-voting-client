export type Language = {
  appName: string;
  splashScreen: {
    message: string;
  };
  welcomeScreen: {
    message: string;
    instructionPrefix: string;
    instructionSuffix: string;
  };
  finishScreen: {
    message: string;
  };
  buttons: {
    previous: string;
    next: string;
    finish: string;
    return: string;
  };
};
