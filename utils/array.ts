export const getkeyFromObject = (list: any[], key: string): string[] => {
  return list.map((item) => item[key])
}

