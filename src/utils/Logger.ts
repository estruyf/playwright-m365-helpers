export const Logger = (...data: any[]): void => {
  console.log(`%c M365:INFO `, "background: #040818; color: #2e78d7", ...data);
};
