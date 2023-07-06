import { generatePusherKey } from "@/helpers/utils";
import { pusherClient } from "@/lib/pusher";
import { useEffect } from "react";

export const useRealTimeUpdates = <T>({
  channel,
  event,
  triggerFun,
}: {
  channel: string;
  event: string;
  triggerFun: (arg_0: T) => void;
}) => {
  useEffect(() => {
    pusherClient.subscribe(generatePusherKey(channel));
    pusherClient.bind(event, triggerFun);
    return () => {
      pusherClient.unsubscribe(generatePusherKey(channel));
      pusherClient.unbind(event, triggerFun);
    };
  }, []);
};
