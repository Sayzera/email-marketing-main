import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getMonthName = (month: number) => {
  return month == 1
    ? 'Ocak'
    : month == 2
      ? 'Şubat'
      : month == 3
        ? 'Mart'
        : month == 4
          ? 'Nisan'
          : month == 5
            ? 'Mayıs'
            : month == 6
              ? 'Haziran'
              : month == 7
                ? 'Temmuz'
                : month == 8
                  ? 'Ağustos'
                  : month == 9
                    ? 'Eylül'
                    : month == 10
                      ? 'Ekim'
                      : month == 11
                        ? 'Kasım'
                        : 'Aralık'


}