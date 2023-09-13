import { Language } from "../types/language";

export const Vietnamese: Language = {
  appName: "GDSC Voting",
  splashScreen: {
    message: "Đang tải dữ liệu...",
  },
  welcomeScreen: {
    message: "Chào mừng bạn đến với",
    instructionPrefix: "Bấm",
    instructionSuffix: "để bầu chọn",
  },
  finishScreen: {
    message: "Cảm ơn bạn đã tham gia bầu cử!",
  },
  buttons: {
    previous: "Trở lại",
    next: "Tiếp theo",
    finish: "Hoàn thành",
    return: "Trở về",
  },
};

export const English: Language = {
  appName: "GDSC Voting",
  splashScreen: {
    message: "Loading data...",
  },
  welcomeScreen: {
    message: "Welcome to",
    instructionPrefix: "Tap",
    instructionSuffix: "to vote",
  },
  finishScreen: {
    message: "Thanks for voting!",
  },
  buttons: {
    previous: "Previous",
    next: "Next",
    finish: "Finish",
    return: "Return",
  },
};

export function getLanguage(language: string = navigator.language) {
  switch (language) {
    case "vi-VN":
      return Vietnamese;
    case "en-US":
      return English;
    default:
      return English;
  }
}
