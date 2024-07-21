import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import PusherClient from 'pusher-js'
import PusherServer from 'pusher'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractUUIDFromString = (url:string) => {
  return url.match(
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9-a-f]{3}-?[0-9a-f]{12}$/i
  )
}


// export const pusherServer = new PusherServer({
//   appId: process.env.PUSHER_APP_ID as string,
//   key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
//   secret: process.env.PUSHER_APP_SECRET as string,
//   cluster: 'mt1',
//   useTLS: true
// })

// export const pusherClient = new PusherClient(
//   process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
//   {
//     cluster: 'mt1'
//   }
// )

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